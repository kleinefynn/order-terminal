use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "purchases")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)]
    pub record_id: i32,

    pub name: String,
    #[sea_orm(column_type = "Text")]
    pub description: Option<String>,
    #[sea_orm(column_type = "Text")]
    pub category: String,
    #[serde(with = "rust_decimal::serde::arbitrary_precision")]
    pub price: Decimal,
    pub amount: u32,
    pub is_entry_card: bool,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::records::Entity",
        from = "Column::RecordId",
        to = "super::records::Column::Id"
    )]
    Purchase,
}

// `Related` trait has to be implemented by hand
impl Related<super::records::Entity> for Entity {
    fn to() -> RelationDef {
        Relation::Purchase.def()
    }
}

impl ActiveModelBehavior for ActiveModel {}
