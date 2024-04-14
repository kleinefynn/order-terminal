use sea_orm_migration::prelude::*;

pub struct Migration;

impl MigrationName for Migration {
    fn name(&self) -> &str {
        "m20240414_002_records"
    }
}

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    // Create Products Table
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_table(
                Table::create()
                    .table(Records::Table)
                    .col(
                        ColumnDef::new(Records::Id)
                            .integer()
                            .not_null()
                            .auto_increment()
                            .primary_key(),
                    )
                    .col(
                        ColumnDef::new(Records::Time)
                            .timestamp_with_time_zone()
                            .not_null(),
                    )
                    .to_owned(),
            )
            .await
    }

    // Define how to rollback this migration: Drop the Bakery table.
    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_table(Table::drop().table(Records::Table).to_owned())
            .await
    }
}

#[derive(Iden)]
pub enum Records {
    Table,
    Id,
    Time,
}
