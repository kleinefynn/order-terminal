import { writable, type Writable } from 'svelte/store';
import type { Item, ShoppingCart } from './Item';

type Warenkorb = { [id: string] : ShoppingCart; };

let items: Warenkorb = {};

const {subscribe, set, update} = writable(items);

const addItem = (item: Item) => {
    let cart_item: ShoppingCart | undefined = items[item.name];

    update((items: Warenkorb) => {
        cart_item === undefined ?
            items[item.name] = {name: item.name, price: item.price, amount: 1} :
            items[item.name].amount += 1;
        
        return items;
    });
}


const change = (item: ShoppingCart, amount: string | number | null) => {
    let cart_item: ShoppingCart | undefined = items[item.name];
    

    if (cart_item === undefined) {
        return;
    }

    const new_amount = Number(amount) < 0 ? 0 : Number(amount);

    update((items: Warenkorb) => {
        cart_item.amount = new_amount;
        return items;
    });
}

const remove = (itemName: string) => {
    update((items: Warenkorb) => {
        delete items[itemName];
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