import { c as create_ssr_component, a as compute_rest_props, b as spread, e as escape_attribute_value, d as escape_object, j as each, v as validate_component, i as escape } from "../../../chunks/ssr.js";
import { c as cn, i as is_void } from "../../../chunks/utils.js";
import "clsx";
const Card = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("rounded-lg border bg-card text-card-foreground shadow-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("p-6 pt-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<p${spread(
    [
      {
        class: escape_attribute_value(cn("text-sm text-muted-foreground", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</p>`;
});
const Card_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-1.5 p-6", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Card_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "tag"]);
  let { class: className = void 0 } = $$props;
  let { tag = "h3" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
    $$bindings.tag(tag);
  return `${((tag$1) => {
    return tag$1 ? `<${tag}${spread(
      [
        {
          class: escape_attribute_value(cn("text-lg font-semibold leading-none tracking-tight", className))
        },
        escape_object($$restProps)
      ],
      {}
    )}>${is_void(tag$1) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
  })(tag)}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const entryFees = [
    { name: "Einzelkarte", price: 3 },
    {
      name: "Superlangertext und bin unkreativ",
      description: "ermäßigt",
      price: 2
    },
    { name: "Gruppenkarte", price: 3 }
  ];
  const merchendise = [
    { name: "Flaschenöffner", price: 3 },
    {
      name: "Superlangertext und bin unkreativ",
      description: "ermäßigt",
      price: 2
    },
    { name: "Schneekugel", price: 3 },
    {
      name: "Superlangertext und bin unkreativ",
      price: 3
    }
  ];
  return `<div class="w-full"><h5 class="mb-2 text-xl font-bold" data-svelte-h="svelte-x2ad93">Eintrittskarten</h5> <div class="flex flex-wrap flex-col w-full md:flex-row mx-auto gap-4">${each(entryFees, (fee) => {
    return `${validate_component(Card, "Card.Root").$$render(
      $$result,
      {
        class: "w-full lg:w-fit relative cursor-pointer hover:bg-red-100"
      },
      {},
      {
        default: () => {
          return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
                default: () => {
                  return `<div class="flex w-32 justify-between"><p class="">${escape(fee.name)}</p></div> `;
                }
              })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `<p class="">${escape(fee.description ?? "")}</p> `;
                }
              })} `;
            }
          })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "flex" }, {}, {
            default: () => {
              return `<p class="font-normal absolute bottom-4">${escape(fee.price)}€</p> `;
            }
          })} `;
        }
      }
    )}`;
  })}</div></div> <div class="w-full"><h5 class="mb-2 text-xl font-bold" data-svelte-h="svelte-1meyn27">Merchendise</h5> <div class="flex flex-wrap flex-col w-full md:flex-row mx-auto gap-4">${each(merchendise, (fee) => {
    return `${validate_component(Card, "Card.Root").$$render(
      $$result,
      {
        class: "w-full lg:w-fit relative cursor-pointer hover:bg-red-100"
      },
      {},
      {
        default: () => {
          return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
                default: () => {
                  return `<div class="flex w-32 justify-between"><p class="">${escape(fee.name)}</p></div> `;
                }
              })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `<p class="">${escape(fee.description ?? "")}</p> `;
                }
              })} `;
            }
          })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "flex" }, {}, {
            default: () => {
              return `<p class="font-normal absolute bottom-4">${escape(fee.price)}€</p> `;
            }
          })} `;
        }
      }
    )}`;
  })}</div> </div>`;
});
export {
  Page as default
};
