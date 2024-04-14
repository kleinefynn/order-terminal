use sea_orm_migration::prelude::*;

use super::{m20240414_001_products::Products, m20240414_002_records::Records};

pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m20240414_003_purchases"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    // Create Products Table
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Purchases::Table)
                    .col(ColumnDef::new(Purchases::ProductId).integer().not_null())
                    .col(ColumnDef::new(Purchases::PurchaseId).integer().not_null())
                    .primary_key(
                        Index::create()
                            .col(Purchases::PurchaseId)
                            .col(Purchases::ProductId),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .from(Purchases::Table, Purchases::PurchaseId)
                            .to(Records::Table, Records::Id),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .from(Purchases::Table, Purchases::ProductId)
                            .to(Products::Table, Products::Id),
                    )
                    .to_owned(),
            )
            .await
    }

    // Define how to rollback this migration: Drop the Bakery table.
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Purchases::Table).to_owned())
            .await
    }
}

#[derive(Iden)]
pub enum Purchases {
    Table,
    PurchaseId,
    ProductId,
}
