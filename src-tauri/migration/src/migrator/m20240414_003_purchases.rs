use sea_orm_migration::prelude::*;

use super::m20240414_002_records::Records;

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
                    .col(ColumnDef::new(Purchases::RecordId).integer().not_null())
                    .col(ColumnDef::new(Purchases::Name).text().not_null())
                    .col(ColumnDef::new(Purchases::Description).text())
                    .col(ColumnDef::new(Purchases::Category).text().not_null())
                    .col(ColumnDef::new(Purchases::Price).decimal().not_null())
                    .col(ColumnDef::new(Purchases::Amount).unsigned().not_null())
                    .foreign_key(
                        ForeignKey::create()
                            .from(Purchases::Table, Purchases::RecordId)
                            .to(Records::Table, Records::Id)
                            .on_delete(ForeignKeyAction::Cascade),
                    )
                    .col(
                        ColumnDef::new(Purchases::IsEntryCard)
                            .boolean()
                            .default(false),
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
    RecordId,
    Name,
    Description,
    Category,
    Price,
    Amount,
    IsEntryCard,
}
