use chrono::FixedOffset;
pub use entities::products as Product;
pub use entities::purchases as Purchase;
pub use entities::records as Record;

use entities::rust_decimal::Decimal;
pub use sea_orm;
use sea_orm::{ActiveValue, DatabaseConnection, DbErr, EntityTrait, InsertResult, IntoActiveModel};
use serde::Deserialize;
use serde::Serialize;

pub struct ProductService;
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
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AddProduct {
    pub name: String,
    pub description: Option<String>,
    pub category: String,
    pub price: Decimal,
}

impl ProductService {
    pub async fn get_all_products(db: &DatabaseConnection) -> Result<Vec<Product::Model>, DbErr> {
        Product::Entity::find().all(db).await
    }

    pub async fn insert_product(
        db: &DatabaseConnection,
        product: Product::Model,
    ) -> Result<InsertResult<Product::ActiveModel>, DbErr> {
        let mut p: Product::ActiveModel = product.into_active_model();
        p.id = ActiveValue::NotSet;
        Product::Entity::insert(p).exec(db).await
    }
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
                });

        Purchase::Entity::insert_many(purchase_models)
            .exec(db)
            .await?;

        Ok(())
    }
}
