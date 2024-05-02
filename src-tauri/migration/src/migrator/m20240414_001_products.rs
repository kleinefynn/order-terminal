use sea_orm_migration::prelude::*;

pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m20240414_001_products"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    // Create Products Table
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Products::Table)
                    .col(
                        ColumnDef::new(Products::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(ColumnDef::new(Products::Name).text().not_null())
                    .col(ColumnDef::new(Products::Description).text())
                    .col(ColumnDef::new(Products::Category).text().not_null())
                    .col(ColumnDef::new(Products::Price).decimal().not_null())
                    .col(
                        ColumnDef::new(Products::IsEntryCard)
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
            .drop_table(Table::drop().table(Products::Table).to_owned())
            .await
    }
}

#[derive(Iden)]
pub enum Products {
    Table,
    Id,
    Name,
    Description,
    Category,
    Price,
    IsEntryCard,
}
