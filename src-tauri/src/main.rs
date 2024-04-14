// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::Result;
use migration::{migrator::Migrator, MigratorTrait};
use services::{
    sea_orm::{Database, DatabaseConnection},
    AddRecord, Product, ProductService, RecordService,
};
const DB_URL: &str = "sqlite:///tmp/test.db?mode=rwc";

#[tokio::main]
async fn main() -> Result<()> {
    let db = Database::connect(DB_URL)
        .await
        .expect("Database connection failed");

    Migrator::up(&db, None).await?;

    let state = AppState { db };

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![
            get_all_products,
            insert_product,
            get_records,
            insert_record
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

    Ok(())
}

#[tauri::command]
async fn get_all_products(state: tauri::State<'_, AppState>) -> Result<String, String> {
    let products: Vec<Product::Model> = ProductService::get_all_products(&state.db)
        .await
        .expect("Error getting products");

    Ok(serde_json::to_string(&products).expect("Couldn't ser"))
}

#[tauri::command]
async fn insert_product(
    state: tauri::State<'_, AppState>,
    product: Product::Model,
) -> Result<i32, String> {
    let insert_result = ProductService::insert_product(&state.db, product)
        .await
        .unwrap();
    Ok(insert_result.last_insert_id)
}

#[tauri::command]
async fn get_records(state: tauri::State<'_, AppState>) -> Result<String, String> {
    let res = RecordService::get_all_records(&state.db).await.unwrap();
    Ok(serde_json::to_string(&res).expect("Serialize failed!"))
}

#[tauri::command]
async fn insert_record(state: tauri::State<'_, AppState>, record: AddRecord) -> Result<(), String> {
    RecordService::insert_record(&state.db, record)
        .await
        .unwrap();

    Ok(())
}

#[derive(Clone)]
struct AppState {
    db: DatabaseConnection,
}
