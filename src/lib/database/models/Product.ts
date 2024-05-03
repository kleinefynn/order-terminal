export interface Product {
    id: number
    name: string
    description?: string,
    price: number,
    category: string,
    is_entry_card: boolean,
}