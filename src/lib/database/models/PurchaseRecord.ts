export interface Purchase {
    purchase_id: number,
    name: string,
    description?: string,
    category: string,
    price: number,
    amount: number,
    is_entry_card: boolean,
}

export interface Record {
    id: number
    time: string,
    purchases: Purchase[],
}

export type AddPurchase = Omit<Purchase, 'purchase_id'>;
export type AddRecord = Pick<Record, 'time'> & { purchases: AddPurchase[] };
