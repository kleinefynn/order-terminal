export interface PurchaseRecord {
    id: number
    time: string
    purchases: Purchase[],
}

export interface Purchase {
    purchase_id: number,
    name: string
    description?: string,
    price: number,
    category: string
    amount: number,
}

export type PurchaseWithoutId = Omit<Purchase, 'purchase_id'>;
export type AddPurchase = Pick<PurchaseRecord, 'time'> & { purchases: PurchaseWithoutId[] };