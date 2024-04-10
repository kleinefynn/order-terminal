import { c as create_ssr_component, h as subscribe, j as each, i as escape } from "../../../chunks/ssr.js";
import { p as purchases } from "../../../chunks/purchases.store.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $purchases, $$unsubscribe_purchases;
  $$unsubscribe_purchases = subscribe(purchases, (value) => $purchases = value);
  $$unsubscribe_purchases();
  return `<div class="flex flex-col">${each($purchases, (purchase) => {
    return `<p>${escape(purchase.time)}</p>`;
  })}</div>`;
});
export {
  Page as default
};
