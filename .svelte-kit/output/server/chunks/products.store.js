import { p as productService } from "./ProductService.js";
import { w as writable } from "./index.js";
let products_map = /* @__PURE__ */ new Map();
const { subscribe, set, update } = writable(products_map);
const remove = async (category, id) => {
  try {
    await productService.deleteProductById(id);
    update((store) => {
      let products2 = store.get(category);
      delete products2?.filter((v) => v.id === id)[0];
      return store;
    });
  } catch (e) {
    console.error(e);
  }
};
const add = async (product) => {
  try {
    let id = await productService.addProduct(product);
    let p = { id, ...product };
    update((store) => {
      let products2 = store.get(p.category);
      products2?.push(p);
      return store;
    });
  } catch (e) {
    console.error(e);
  }
};
let sample_products = [
  {
    name: "Einzelkarte",
    price: 3,
    category: "Eintrittskarte"
  },
  {
    name: "Einzelkarte",
    description: "ermäßigt",
    price: 2,
    category: "Eintrittskarte"
  },
  {
    name: "Gruppenkarte",
    price: 3,
    category: "Eintrittskarte"
  },
  {
    name: "Flaschenöffner",
    price: 2.99,
    category: "Merchendise"
  },
  {
    name: "Superlangertext und bin unkreativ",
    description: "ermäßigt",
    price: 2.5,
    category: "Merchendise"
  },
  {
    name: "Schneekugel",
    price: 3,
    category: "Merchendise"
  },
  {
    name: "Superlangertext und bin unkreativ",
    price: 3,
    category: "Merchendise"
  }
];
productService.isInitCompleted.subscribe({
  complete: async () => {
    await init_store();
  }
});
async function init_store() {
  let products2 = await productService.getProducts();
  if (products2.length == 0) {
    for (const p of sample_products) {
      await productService.addProduct(p);
    }
    products2 = await productService.getProducts();
  }
  const map = products_map;
  for (const product of products2) {
    let list = map.get(product.category);
    if (list === void 0) {
      list = [];
      map.set(product.category, list);
    }
    list.push(product);
  }
  set(products_map);
}
const get = () => Array.from(products_map.values());
const products = {
  subscribe,
  add,
  remove,
  get
};
export {
  products as p
};
