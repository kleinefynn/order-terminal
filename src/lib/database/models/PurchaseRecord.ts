import type { ShoppingCartItem } from "../../../routes/kasse/Item"
import type { Product } from "./Product"

export interface PurchaseRecord {
    id: number
    time: string
    products: ShoppingCartItem[],
    
}

export interface Purchase {
    purchase_id: number,
    product_id: number,
    name: string
    description?: string,
    price: number,
    category: string
    amount: number,
}