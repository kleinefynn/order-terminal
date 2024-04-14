use rust_decimal::Decimal;
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "products")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)]
    pub id: i32,
    pub name: String,
    #[sea_orm(column_type = "Text")]
    pub description: Option<String>,
    #[sea_orm(column_type = "Text")]
    pub category: String,
    #[serde(with = "rust_decimal::serde::arbitrary_precision")]
    pub price: Decimal,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl Related<super::records::Entity> for Entity {
    fn to() -> RelationDef {
        super::purchases::Relation::Purchase.def()
    }

    fn via() -> Option<RelationDef> {
        Some(super::purchases::Relation::Product.def().rev())
    }
}

impl ActiveModelBehavior for ActiveModel {}
