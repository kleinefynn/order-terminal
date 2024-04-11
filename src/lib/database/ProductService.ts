import type { Product } from './models/Product';
import { SQLiteDBConnection } from '@capacitor-community/sqlite';
import { sqliteService } from './SQLiteService';
import { dbVersionService } from './DbVersionService';
import { ProductUpgradeStatements } from './upgrades/product.migration';
import { BehaviorSubject } from 'rxjs';

export interface IProductService {
    initializeDatabase(): Promise<void>
    getProducts(): Promise<Product[]>
    addProduct(Product: Product): Promise<number>
    updateProductById(id: number, active: number): Promise<void>
    deleteProductById(id: number): Promise<void>
    getDatabaseName(): string
    getDatabaseVersion(): number,
}
class ProductService implements IProductService {
    versionUpgrades = ProductUpgradeStatements;
    loadToVersion = ProductUpgradeStatements[ProductUpgradeStatements.length - 1].toVersion;
    db!: SQLiteDBConnection;
    database: string = 'products';
    platform = sqliteService.getPlatform();
    isInitCompleted = new BehaviorSubject(false);

    async initializeDatabase(): Promise<void> {
        // create upgrade statements
        try {
            await sqliteService.addUpgradeStatement({
                database: this.database,
                upgrade: this.versionUpgrades
            });
            this.db = await sqliteService.openDatabase(this.database, this.loadToVersion, false);
            const isData = await this.db.query("select * from sqlite_sequence");
            if (isData.values!.length === 0) {
                // create database initial Products if any

            }

            dbVersionService.setDbVersion(this.database, this.loadToVersion);
            if (this.platform === 'web') {
                await sqliteService.saveToStore(this.database);
            }
            this.isInitCompleted.next(true);
            this.isInitCompleted.complete();
        } catch (err) {
            const msg = (err as Error).message ? (err as Error).message : err;
            throw new Error(`ProductService.initializeDatabase: ${msg}`);
        }
    }
    async getProducts(): Promise<Product[]> {
        return (await this.db.query('SELECT product_id as id, name, description, price, category FROM products;')).values as Product[];
    }
    async getProductsWithPurchases(): Promise<Product[]> {
        return (await this.db.query('SELECT product_id as id, name, description, price, category FROM products NATURAL JOIN purchases;')).values as Product[];
    }
    async addProduct(Product: Omit<Product, 'id'>): Promise<number> {
        const sql = `INSERT INTO products (name, description, price, category) VALUES (?,?,?,?);`;
        const res = await this.db.run(sql, [Product.name, Product.description, Product.price, Product.category]);
        if (res.changes !== undefined
            && res.changes.lastId !== undefined && res.changes.lastId > 0) {
            return res.changes.lastId;
        } else {
            throw new Error(`storageService.addProduct: lastId not returned`);
        }
    }
    async updateProductById(id: number): Promise<void> {
        const sql = `UPDATE products SET WHERE product_id=${id}`;
        await this.db.run(sql);
    }
    async deleteProductById(id: number): Promise<void> {
        const sql = `DELETE FROM products WHERE product_id=${id}`;
        await this.db.run(sql);
    }
    async flushTable(): Promise<void> {
        const sql = `DELETE FROM products`;
        await this.db.run(sql);
    }
    getDatabaseName(): string {
        return this.database;
    }
    getDatabaseVersion(): number {
        return this.loadToVersion;
    }
}
// Singleton instance of the service
export const productService = new ProductService();