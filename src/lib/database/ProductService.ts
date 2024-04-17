import type { Product } from './models/Product';
import { invoke } from '@tauri-apps/api/tauri'

export interface IProductService {
    getProducts(): Promise<Product[]>
    addProduct(Product: Product): Promise<number>
    deleteProductById(id: number): Promise<void>
}
class ProductService implements IProductService {
    async getProducts(): Promise<Product[]> {
        //return (await this.db.query('SELECT product_id as id, name, description, price, category FROM products;')).values as Product[];
        let products: string = await invoke("get_all_products");
        let p: Product[] = JSON.parse(products);
        return p;
    }
    async addProduct(product: Omit<Product, 'id'>): Promise<number> {
        return await invoke("insert_product", { product }) as number;
    }
    async deleteProductById(id: number): Promise<void> {
        await invoke("delete_product", { id })
    }
}
// Singleton instance of the service
export const productService = new ProductService();