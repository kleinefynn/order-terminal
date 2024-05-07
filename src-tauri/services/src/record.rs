use chrono::FixedOffset;
use entities::purchases as Purchase;
use entities::records as Record;
use entities::rust_decimal::Decimal;
use sea_orm::DeleteResult;
use sea_orm::{ActiveValue, DatabaseConnection, DbErr, EntityTrait, InsertResult};
use serde::Deserialize;
use serde::Serialize;
pub struct RecordService;

#[derive(Serialize, Deserialize, Debug)]
pub struct AddRecord {
    time: chrono::DateTime<FixedOffset>,
    purchases: Vec<AddPurchase>,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AddPurchase {
    name: String,
    description: Option<String>,
    category: String,
    price: Decimal,
    amount: u32,
    is_entry_card: bool,
}

impl RecordService {
    pub async fn get_all_records(
        db: &DatabaseConnection,
    ) -> Result<Vec<(Record::Model, Vec<Purchase::Model>)>, DbErr> {
        Record::Entity::find()
            .find_with_related(Purchase::Entity)
            .all(db)
            .await
    }

    pub async fn get_paginated_records(
        db: &DatabaseConnection,
        offset: u32,
        limit: u64,
    ) -> Result<Vec<(Record::Model, Vec<Purchase::Model>)>, DbErr> {
        let mut cursor = Record::Entity::find().cursor_by(Record::Column::Id);

        let mut records: Vec<(Record::Model, Vec<Purchase::Model>)> =
            Vec::with_capacity(limit as usize);

        for record in cursor.after(offset).first(limit).all(db).await? {
            let r: Vec<(Record::Model, Vec<Purchase::Model>)> =
                Record::Entity::find_by_id(record.id)
                    .find_with_related(Purchase::Entity)
                    .all(db)
                    .await?;

            println!("{:?}", r);

            let x = &r[0];

            records.push(x.clone());
        }

        Ok(records)
    }

    pub async fn insert_record(db: &DatabaseConnection, record: AddRecord) -> Result<(), DbErr> {
        let r: Record::ActiveModel = Record::ActiveModel {
            id: ActiveValue::NotSet,
            time: ActiveValue::Set(record.time),
        };

        let record_insert: InsertResult<Record::ActiveModel> =
            Record::Entity::insert(r).exec(db).await?;

        let purchase_models =
            record
                .purchases
                .iter()
                .cloned()
                .map(|product| Purchase::ActiveModel {
                    record_id: ActiveValue::Set(record_insert.last_insert_id),
                    name: ActiveValue::Set(product.name),
                    description: ActiveValue::Set(product.description),
                    category: ActiveValue::Set(product.category),
                    price: ActiveValue::Set(product.price),
                    amount: ActiveValue::Set(product.amount),
                    is_entry_card: ActiveValue::Set(product.is_entry_card),
                });

        Purchase::Entity::insert_many(purchase_models)
            .exec(db)
            .await?;

        Ok(())
    }

    pub async fn delete_record(
        db: &DatabaseConnection,
        id: i32,
    ) -> Result<DeleteResult, sea_orm::DbErr> {
        Record::Entity::delete_by_id(id).exec(db).await
    }
}
