use chrono::FixedOffset;
use sea_orm::entity::prelude::*;
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Eq, DeriveEntityModel, Serialize, Deserialize)]
#[sea_orm(table_name = "records")]
pub struct Model {
    #[sea_orm(primary_key)]
    #[serde(skip_deserializing)]
    pub id: i32,
    pub time: chrono::DateTime<FixedOffset>,
}

#[derive(Copy, Clone, Debug, EnumIter, DeriveRelation)]
pub enum Relation {}

impl Related<super::products::Entity> for Entity {
    fn to() -> RelationDef {
        super::purchases::Relation::Product.def()
    }

    fn via() -> Option<RelationDef> {
        Some(super::purchases::Relation::Purchase.def().rev())
    }
}

impl ActiveModelBehavior for ActiveModel {}
