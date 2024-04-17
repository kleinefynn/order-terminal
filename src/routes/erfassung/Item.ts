import type { Product } from "$lib/database/models/Product";

export interface ShoppingCartItem {
    product: Product,
    amount: number,
}