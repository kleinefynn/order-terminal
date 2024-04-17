use entities::products as Product;
use entities::rust_decimal::Decimal;
use sea_orm::{
    ActiveValue, DatabaseConnection, DbErr, EntityTrait, InsertResult, IntoActiveModel, QueryFilter,
};
use sea_orm::{ColumnTrait, DeleteResult};
use serde::Deserialize;
use serde::Serialize;

pub struct ProductService;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct AddProduct {
    pub name: String,
    pub description: Option<String>,
    pub category: String,
    pub price: Decimal,
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct UpdateProduct {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub category: String,
    pub price: Decimal,
}

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

    pub async fn update_product(
        db: &DatabaseConnection,
        product: UpdateProduct,
    ) -> Result<entities::products::Model, DbErr> {
        let p: Product::ActiveModel = Product::ActiveModel {
            id: ActiveValue::Unchanged(product.id),
            name: ActiveValue::Set(product.name),
            description: ActiveValue::Set(product.description),
            category: ActiveValue::Set(product.category),
            price: ActiveValue::Set(product.price),
        };
        Product::Entity::update(p)
            .filter(Product::Column::Id.eq(product.id))
            .exec(db)
            .await
    }

    pub async fn delete_product(
        db: &DatabaseConnection,
        product_id: i32,
    ) -> Result<DeleteResult, sea_orm::DbErr> {
        let active_model = Product::ActiveModel {
            id: ActiveValue::Set(product_id),
            ..Default::default()
        };
        Product::Entity::delete(active_model).exec(db).await
    }
}
