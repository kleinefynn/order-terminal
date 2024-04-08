export interface Item {
    name: string,
    // todo: better type for currency
    price: number,
    description?: string,
}

export interface ShoppingCart {
    name: string,
    price: number,
    amount: number,
}