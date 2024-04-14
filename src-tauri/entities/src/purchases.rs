use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "purchases")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)]
    pub record_id: i32,
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)]
    pub product_id: i32,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {
    #[sea_orm(
        belongs_to = "super::records::Entity",
        from = "Column::RecordId",
        to = "super::records::Column::Id"
    )]
    Purchase,
    #[sea_orm(
        belongs_to = "super::products::Entity",
        from = "Column::ProductId",
        to = "super::products::Column::Id"
    )]
    Product,
}

impl ActiveModelBehavior for ActiveModel {}
