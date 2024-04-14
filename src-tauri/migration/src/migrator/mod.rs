use sea_orm_migration::prelude::*;

mod m20240414_001_products;
mod m20240414_002_records;
mod m20240414_003_purchases;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20240414_001_products::Migration),
            Box::new(m20240414_002_records::Migration),
            Box::new(m20240414_003_purchases::Migration),
        ]
    }
}
