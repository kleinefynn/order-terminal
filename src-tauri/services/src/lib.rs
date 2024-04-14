pub use entities::products as Product;
pub use sea_orm;
use sea_orm::{ActiveValue, DatabaseConnection, DbErr, EntityTrait, InsertResult, IntoActiveModel};

pub struct ProductService;

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
