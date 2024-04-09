import { p as productService } from "./ProductService.js";
import { w as writable } from "./index.js";
let entryFees = [
  {
    name: "Einzelkarte",
    price: 3
  },
  {
    name: "Superlangertext und bin unkreativ",
    description: "ermäßigt",
    price: 2
  },
  {
    name: "Gruppenkarte",
    price: 3
  }
];
const merchendise = [
  {
    name: "Flaschenöffner",
    price: 2.99
  },
  {
    name: "Superlangertext und bin unkreativ",
    description: "ermäßigt",
    price: 2.5
  },
  {
    name: "Schneekugel",
    price: 3
  },
  {
    name: "Superlangertext und bin unkreativ",
    price: 3
  }
];
const { subscribe, set, update } = writable([]);
const remove = async (id) => {
  try {
    await productService.deleteProductById(id);
    update((items) => {
      delete items.filter((v) => v.id === id)[0];
      return items;
    });
  } catch (e) {
    console.error(e);
  }
};
const add = async (product) => {
  try {
    let id = await productService.addProduct(product);
    let p = { id, ...product };
    update((items) => {
      return [...items, p];
    });
  } catch (e) {
    console.error(e);
  }
};
productService.isInitCompleted.subscribe({
  complete: async () => {
    await init_store();
  }
});
async function init_store() {
  let products2 = await productService.getProducts();
  if (products2.length == 0) {
    for (const fee of entryFees) {
      await productService.addProduct(fee);
    }
    for (const merch of merchendise) {
      await productService.addProduct(merch);
    }
    products2 = await productService.getProducts();
  }
  set(products2);
}
const products = {
  subscribe,
  add,
  remove
};
export {
  products as p
};
