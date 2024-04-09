import type { Product } from "$lib/database/models/Product";

export interface ShoppingCart {
    product: Product,
    amount: number,
}