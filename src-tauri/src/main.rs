// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use anyhow::Result;
use futures::stream::StreamExt;
use migration::{migrator::Migrator, MigratorTrait};
use services::{
    product::{AddProduct, ProductService, UpdateProduct},
    record::{AddRecord, RecordService},
    sea_orm::{Database, DatabaseConnection},
    Product,
};
use tauri::Manager;
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
        .setup(|app| {
            let main_window = app.get_window("main").unwrap();

            let _ = main_window.with_webview(|webview| {
                #[cfg(target_os = "linux")]
                {
                    // see https://docs.rs/webkit2gtk/0.18.2/webkit2gtk/struct.WebView.html
                    // and https://docs.rs/webkit2gtk/0.18.2/webkit2gtk/trait.WebViewExt.html
                    use webkit2gtk::traits::WebViewExt;
                    webview.inner().set_zoom_level(1.5);
                }

                #[cfg(windows)]
                unsafe {
                    // see https://docs.rs/webview2-com/0.19.1/webview2_com/Microsoft/Web/WebView2/Win32/struct.ICoreWebView2Controller.html
                    webview.controller().SetZoomFactor(1.5).unwrap();
                }

                #[cfg(target_os = "macos")]
                unsafe {
                    let () = msg_send![webview.inner(), setPageZoom: 1.5];
                }
            });

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_all_products,
            insert_product,
            update_product,
            delete_product,
            get_records,
            get_records_paginated,
            insert_record,
            delete_record,
            import_purchases,
            export_purchases,
            import_products,
            export_products
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
async fn update_product(
    state: tauri::State<'_, AppState>,
    product: UpdateProduct,
) -> Result<(), String> {
    let _ = ProductService::update_product(&state.db, product)
        .await
        .unwrap();
    Ok(())
}

#[tauri::command]
async fn delete_product(state: tauri::State<'_, AppState>, id: i32) -> Result<(), String> {
    let _ = ProductService::delete_product(&state.db, id).await.unwrap();
    Ok(())
}

#[tauri::command]
async fn get_records(state: tauri::State<'_, AppState>) -> Result<String, String> {
    let res = RecordService::get_all_records(&state.db).await.unwrap();
    Ok(serde_json::to_string(&res).expect("Serialize failed!"))
}

#[tauri::command]
async fn get_records_paginated(
    state: tauri::State<'_, AppState>,
    offset: u32,
    limit: u64,
) -> Result<String, String> {
    let res = RecordService::get_paginated_records(&state.db, offset, limit)
        .await
        .unwrap();
    Ok(serde_json::to_string(&res).expect("Serialize failed!"))
}

#[tauri::command]
async fn insert_record(state: tauri::State<'_, AppState>, record: AddRecord) -> Result<(), String> {
    RecordService::insert_record(&state.db, record)
        .await
        .unwrap();

    Ok(())
}

#[tauri::command]
async fn delete_record(state: tauri::State<'_, AppState>, id: i32) -> Result<(), String> {
    RecordService::delete_record(&state.db, id).await.unwrap();

    Ok(())
}

#[tauri::command]
async fn import_purchases(path: String) -> Result<Vec<AddRecord>, String> {
    let file = tokio::fs::File::open(path)
        .await
        .map_err(|e| e.to_string())?;
    let mut reader = csv_async::AsyncReaderBuilder::new()
        .has_headers(false)
        .create_deserializer(file);
    let mut records = reader.deserialize::<AddRecord>();

    let mut loaded_records: Vec<AddRecord> = Vec::new();

    while let Some(record) = records.next().await {
        let record: AddRecord = record.map_err(|e| e.to_string())?;
        loaded_records.push(record);
    }

    println!("{:?}", loaded_records);

    Ok(loaded_records)
}

#[tauri::command]
async fn export_purchases(path: String, records: Vec<AddRecord>) -> Result<(), String> {
    println!("path: {}", path);
    let file = tokio::fs::File::create(path)
        .await
        .map_err(|e| e.to_string())?;

    let mut writer = csv_async::AsyncWriterBuilder::new()
        .has_headers(false)
        .create_serializer(file);

    for record in records {
        writer.serialize(record).await.map_err(|e| e.to_string())?;
    }

    Ok(())
}

#[tauri::command]
async fn import_products(path: String) -> Result<Vec<AddProduct>, String> {
    let file = tokio::fs::File::open(path)
        .await
        .map_err(|e| e.to_string())?;
    let mut reader = csv_async::AsyncReaderBuilder::new()
        .has_headers(false)
        .create_deserializer(file);
    let mut products = reader.deserialize::<AddProduct>();

    let mut loaded_records: Vec<AddProduct> = Vec::new();

    while let Some(product) = products.next().await {
        let product: AddProduct = product.map_err(|e| e.to_string())?;
        loaded_records.push(product);
    }

    println!("{:?}", loaded_records);

    Ok(loaded_records)
}

#[tauri::command]
async fn export_products(path: String, products: Vec<AddProduct>) -> Result<(), String> {
    println!("path: {}", path);
    let file = tokio::fs::File::create(path)
        .await
        .map_err(|e| e.to_string())?;

    let mut writer = csv_async::AsyncWriterBuilder::new()
        .has_headers(false)
        .create_serializer(file);

    for product in products {
        writer.serialize(product).await.map_err(|e| e.to_string())?;
    }

    Ok(())
}

#[derive(Clone)]
struct AppState {
    db: DatabaseConnection,
}
