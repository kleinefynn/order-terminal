import { writable } from 'svelte/store';
import type { ShoppingCartItem } from './Item';
import '../products.store';
import type { Product } from '$lib/database/models/Product';
import { purchaseRecordService } from '$lib/database/PurchaseRecordsService';
import type { PurchaseWithoutId } from '$lib/database/models/PurchaseRecord';

type Warenkorb = { [id: string] : ShoppingCartItem; };

let items: Warenkorb = {};


const {subscribe, set, update} = writable(items);

const addItem = (item: Product) => {
    let cart_item: ShoppingCartItem | undefined = items[item.id];

    update((items: Warenkorb) => {
        cart_item === undefined ?
            items[item.id] = {amount: 1, product: {...item}} :
            items[item.id].amount += 1;
        
        return items;
    });
}


const change = (item: ShoppingCartItem, amount: string | number | null) => {
    let cart_item: ShoppingCartItem | undefined = items[item.product.id];
    

    if (cart_item === undefined) {
        return;
    }

    const new_amount = Number(amount) < 1 ? 1 : Number(amount);

    update((items: Warenkorb) => {
        cart_item.amount = new_amount;
        return items;
    });
}

const remove = (id: number) => {
    update((items: Warenkorb) => {
        delete items[id];
        return items;
    });
}

const reset = () => {
    items = {};
    set(items);
};
    
const purchase = async () => {
    let products: ShoppingCartItem[] | PurchaseWithoutId[] = Object.values(items);

    if (products.length === 0) {
        return;
    }


    products = products.map(product => {
        return {...product.product, amount: product.amount, product_id: product.product.id};
    });

    await purchaseRecordService.addPurchaseRecord({
        time: new Date().toISOString(),
        purchases: products,
    });

    let purchases = await purchaseRecordService.getPurchaseRecords();
    console.log(purchases);
    
    reset();

}

export default {
    subscribe,
    addItem,
    change,
    remove,
    reset,
    purchase
};