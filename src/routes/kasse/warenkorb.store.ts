import { writable } from 'svelte/store';
import type { ShoppingCart } from './Item';
import '../products.store';
import type { Product } from '$lib/database/models/Product';

type Warenkorb = { [id: string] : ShoppingCart; };

let items: Warenkorb = {};


const {subscribe, set, update} = writable(items);

const addItem = (item: Product) => {
    let cart_item: ShoppingCart | undefined = items[item.id];

    update((items: Warenkorb) => {
        cart_item === undefined ?
            items[item.id] = {amount: 1, product: {...item}} :
            items[item.id].amount += 1;
        
        return items;
    });
}


const change = (item: ShoppingCart, amount: string | number | null) => {
    let cart_item: ShoppingCart | undefined = items[item.product.id];
    

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
    

export default {
    subscribe,
    addItem,
    change,
    remove,
    reset
};