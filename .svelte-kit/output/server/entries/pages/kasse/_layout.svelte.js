import { s as setContext, g as getContext, c as create_ssr_component, h as subscribe$1, a as compute_rest_props, b as spread, d as escape_object, f as add_attribute, e as escape_attribute_value, v as validate_component, j as each, i as escape } from "../../../chunks/ssr.js";
import { t as toWritableStores, m as makeElement, x as createBitAttrs, y as createDialog, z as removeUndefined, A as getOptionUpdater, B as createDispatcher, I as Icon, F as buttonVariants, C as fade, E as Button } from "../../../chunks/index2.js";
import { i as is_void, c as cn, f as flyAndScale } from "../../../chunks/ProductService.js";
import "dequal";
import "clsx";
import { d as derived, w as writable } from "../../../chunks/index.js";
import "../../../chunks/products.store.js";
const defaults = {
  orientation: "horizontal",
  decorative: false
};
const createSeparator = (props) => {
  const withDefaults = { ...defaults, ...props };
  const options = toWritableStores(withDefaults);
  const { orientation, decorative } = options;
  const root = makeElement("separator", {
    stores: [orientation, decorative],
    returned: ([$orientation, $decorative]) => {
      const ariaOrientation = $orientation === "vertical" ? $orientation : void 0;
      return {
        role: $decorative ? "none" : "separator",
        "aria-orientation": ariaOrientation,
        "aria-hidden": $decorative,
        "data-orientation": $orientation
      };
    }
  });
  return {
    elements: {
      root
    },
    options
  };
};
function getAlertDialogData() {
  const NAME = "alert-dialog";
  const PARTS = [
    "action",
    "cancel",
    "content",
    "description",
    "overlay",
    "portal",
    "title",
    "trigger"
  ];
  return { NAME, PARTS };
}
function setCtx$1(props) {
  const { NAME, PARTS } = getAlertDialogData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const initAlertDialog = createDialog({
    ...removeUndefined(props),
    role: "alertdialog",
    forceVisible: true
  });
  const alertDialog = {
    ...initAlertDialog,
    getAttrs,
    updateOption: getOptionUpdater(initAlertDialog.options)
  };
  setContext(NAME, alertDialog);
  return {
    ...alertDialog,
    updateOption: getOptionUpdater(alertDialog.options),
    getAttrs
  };
}
function getCtx() {
  const { NAME } = getAlertDialogData();
  return getContext(NAME);
}
const Alert_dialog = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $idValues, $$unsubscribe_idValues;
  let { preventScroll = void 0 } = $$props;
  let { closeOnEscape = void 0 } = $$props;
  let { closeOnOutsideClick = false } = $$props;
  let { portal = void 0 } = $$props;
  let { open = void 0 } = $$props;
  let { onOpenChange = void 0 } = $$props;
  let { openFocus = void 0 } = $$props;
  let { closeFocus = void 0 } = $$props;
  let { onOutsideClick = void 0 } = $$props;
  const { states: { open: localOpen }, updateOption, ids } = setCtx$1({
    closeOnEscape,
    preventScroll,
    closeOnOutsideClick,
    portal,
    forceVisible: true,
    defaultOpen: open,
    openFocus,
    closeFocus,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.content, ids.description, ids.title], ([$contentId, $descriptionId, $titleId]) => ({
    content: $contentId,
    description: $descriptionId,
    title: $titleId
  }));
  $$unsubscribe_idValues = subscribe$1(idValues, (value) => $idValues = value);
  if ($$props.preventScroll === void 0 && $$bindings.preventScroll && preventScroll !== void 0)
    $$bindings.preventScroll(preventScroll);
  if ($$props.closeOnEscape === void 0 && $$bindings.closeOnEscape && closeOnEscape !== void 0)
    $$bindings.closeOnEscape(closeOnEscape);
  if ($$props.closeOnOutsideClick === void 0 && $$bindings.closeOnOutsideClick && closeOnOutsideClick !== void 0)
    $$bindings.closeOnOutsideClick(closeOnOutsideClick);
  if ($$props.portal === void 0 && $$bindings.portal && portal !== void 0)
    $$bindings.portal(portal);
  if ($$props.open === void 0 && $$bindings.open && open !== void 0)
    $$bindings.open(open);
  if ($$props.onOpenChange === void 0 && $$bindings.onOpenChange && onOpenChange !== void 0)
    $$bindings.onOpenChange(onOpenChange);
  if ($$props.openFocus === void 0 && $$bindings.openFocus && openFocus !== void 0)
    $$bindings.openFocus(openFocus);
  if ($$props.closeFocus === void 0 && $$bindings.closeFocus && closeFocus !== void 0)
    $$bindings.closeFocus(closeFocus);
  if ($$props.onOutsideClick === void 0 && $$bindings.onOutsideClick && onOutsideClick !== void 0)
    $$bindings.onOutsideClick(onOutsideClick);
  open !== void 0 && localOpen.set(open);
  {
    updateOption("preventScroll", preventScroll);
  }
  {
    updateOption("closeOnEscape", closeOnEscape);
  }
  {
    updateOption("closeOnOutsideClick", closeOnOutsideClick);
  }
  {
    updateOption("portal", portal);
  }
  {
    updateOption("openFocus", openFocus);
  }
  {
    updateOption("closeFocus", closeFocus);
  }
  {
    updateOption("onOutsideClick", onOutsideClick);
  }
  $$unsubscribe_idValues();
  return `${slots.default ? slots.default({ ids: $idValues }) : ``}`;
});
const Alert_dialog_title$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["level", "asChild", "id", "el"]);
  let $title, $$unsubscribe_title;
  let { level = "h2" } = $$props;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { title }, ids, getAttrs } = getCtx();
  $$unsubscribe_title = subscribe$1(title, (value) => $title = value);
  const attrs = getAttrs("title");
  if ($$props.level === void 0 && $$bindings.level && level !== void 0)
    $$bindings.level(level);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.title.set(id);
    }
  }
  builder = $title;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_title();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `${((tag) => {
    return tag ? `<${level}${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${is_void(tag) ? "" : `${slots.default ? slots.default({ builder }) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(level)}`}`;
});
const Alert_dialog_action$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $close, $$unsubscribe_close;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { close }, getAttrs } = getCtx();
  $$unsubscribe_close = subscribe$1(close, (value) => $close = value);
  createDispatcher();
  const attrs = getAttrs("action");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $close;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_close();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Alert_dialog_cancel$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $close, $$unsubscribe_close;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { close }, getAttrs } = getCtx();
  $$unsubscribe_close = subscribe$1(close, (value) => $close = value);
  createDispatcher();
  const attrs = getAttrs("cancel");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $close;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_close();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Alert_dialog_portal$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $portalled, $$unsubscribe_portalled;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { portalled }, getAttrs } = getCtx();
  $$unsubscribe_portalled = subscribe$1(portalled, (value) => $portalled = value);
  const attrs = getAttrs("portal");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $portalled;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_portalled();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
const Alert_dialog_content$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "id",
    "asChild",
    "el"
  ]);
  let $content, $$unsubscribe_content;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { id = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { content }, states: { open }, ids, getAttrs } = getCtx();
  $$unsubscribe_content = subscribe$1(content, (value) => $content = value);
  $$unsubscribe_open = subscribe$1(open, (value) => $open = value);
  const attrs = getAttrs("content");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.content.set(id);
    }
  }
  builder = $content;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_content();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>` : ``}`}`}`}`}`}`;
});
const Alert_dialog_overlay$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "el"
  ]);
  let $overlay, $$unsubscribe_overlay;
  let $open, $$unsubscribe_open;
  let { transition = void 0 } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { inTransition = void 0 } = $$props;
  let { inTransitionConfig = void 0 } = $$props;
  let { outTransition = void 0 } = $$props;
  let { outTransitionConfig = void 0 } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { overlay }, states: { open }, getAttrs } = getCtx();
  $$unsubscribe_overlay = subscribe$1(overlay, (value) => $overlay = value);
  $$unsubscribe_open = subscribe$1(open, (value) => $open = value);
  const attrs = getAttrs("overlay");
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.inTransition === void 0 && $$bindings.inTransition && inTransition !== void 0)
    $$bindings.inTransition(inTransition);
  if ($$props.inTransitionConfig === void 0 && $$bindings.inTransitionConfig && inTransitionConfig !== void 0)
    $$bindings.inTransitionConfig(inTransitionConfig);
  if ($$props.outTransition === void 0 && $$bindings.outTransition && outTransition !== void 0)
    $$bindings.outTransition(outTransition);
  if ($$props.outTransitionConfig === void 0 && $$bindings.outTransitionConfig && outTransitionConfig !== void 0)
    $$bindings.outTransitionConfig(outTransitionConfig);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $overlay;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_overlay();
  $$unsubscribe_open();
  return `${asChild && $open ? `${slots.default ? slots.default({ builder }) : ``}` : `${transition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${inTransition && outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${inTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${outTransition && $open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : `${$open ? `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>` : ``}`}`}`}`}`}`;
});
const Alert_dialog_trigger = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "el"]);
  let $trigger, $$unsubscribe_trigger;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { trigger }, getAttrs } = getCtx();
  $$unsubscribe_trigger = subscribe$1(trigger, (value) => $trigger = value);
  createDispatcher();
  const attrs = getAttrs("trigger");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  builder = $trigger;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_trigger();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<button${spread([escape_object(builder), { type: "button" }, escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</button>`}`;
});
const Alert_dialog_description$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["asChild", "id", "el"]);
  let $description, $$unsubscribe_description;
  let { asChild = false } = $$props;
  let { id = void 0 } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { description }, ids, getAttrs } = getCtx();
  $$unsubscribe_description = subscribe$1(description, (value) => $description = value);
  const attrs = getAttrs("description");
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    if (id) {
      ids.description.set(id);
    }
  }
  builder = $description;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_description();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}>${slots.default ? slots.default({ builder }) : ``}</div>`}`;
});
function getSeparatorData() {
  const NAME = "separator";
  const PARTS = ["root"];
  return {
    NAME,
    PARTS
  };
}
function setCtx(props) {
  const { NAME, PARTS } = getSeparatorData();
  const getAttrs = createBitAttrs(NAME, PARTS);
  const separator = { ...createSeparator(removeUndefined(props)), getAttrs };
  return {
    ...separator,
    updateOption: getOptionUpdater(separator.options)
  };
}
const Separator$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let builder;
  let $$restProps = compute_rest_props($$props, ["orientation", "decorative", "asChild", "el"]);
  let $root, $$unsubscribe_root;
  let { orientation = "horizontal" } = $$props;
  let { decorative = true } = $$props;
  let { asChild = false } = $$props;
  let { el = void 0 } = $$props;
  const { elements: { root }, updateOption, getAttrs } = setCtx({ orientation, decorative });
  $$unsubscribe_root = subscribe$1(root, (value) => $root = value);
  const attrs = getAttrs("root");
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.decorative === void 0 && $$bindings.decorative && decorative !== void 0)
    $$bindings.decorative(decorative);
  if ($$props.asChild === void 0 && $$bindings.asChild && asChild !== void 0)
    $$bindings.asChild(asChild);
  if ($$props.el === void 0 && $$bindings.el && el !== void 0)
    $$bindings.el(el);
  {
    updateOption("orientation", orientation);
  }
  {
    updateOption("decorative", decorative);
  }
  builder = $root;
  {
    Object.assign(builder, attrs);
  }
  $$unsubscribe_root();
  return `${asChild ? `${slots.default ? slots.default({ builder }) : ``}` : `<div${spread([escape_object(builder), escape_object($$restProps)], {})}${add_attribute("this", el, 0)}></div>`}`;
});
const Input = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "value"]);
  let { class: className = void 0 } = $$props;
  let { value = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `<input${spread(
    [
      {
        class: escape_attribute_value(cn("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}${add_attribute("value", value, 0)}>`;
});
const Separator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "orientation", "decorative"]);
  let { class: className = void 0 } = $$props;
  let { orientation = "horizontal" } = $$props;
  let { decorative = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.orientation === void 0 && $$bindings.orientation && orientation !== void 0)
    $$bindings.orientation(orientation);
  if ($$props.decorative === void 0 && $$bindings.decorative && decorative !== void 0)
    $$bindings.decorative(decorative);
  return `${validate_component(Separator$1, "SeparatorPrimitive.Root").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn(
          "shrink-0 bg-border",
          orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
          className
        )
      },
      { orientation },
      { decorative },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div class="relative w-full overflow-auto"><table${spread(
    [
      {
        class: escape_attribute_value(cn("w-full caption-bottom text-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</table></div>`;
});
const Table_body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<tbody${spread(
    [
      {
        class: escape_attribute_value(cn("[&_tr:last-child]:border-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</tbody>`;
});
const Table_caption = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<caption${spread(
    [
      {
        class: escape_attribute_value(cn("mt-4 text-sm text-muted-foreground", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</caption>`;
});
const Table_cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<td${spread(
    [
      {
        class: escape_attribute_value(cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</td>`;
});
const Table_head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<th${spread(
    [
      {
        class: escape_attribute_value(cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</th>`;
});
const Table_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return ` <thead${spread(
    [
      {
        class: escape_attribute_value(cn("[&_tr]:border-b", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</thead>`;
});
const Table_row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<tr${spread(
    [
      {
        class: escape_attribute_value(cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</tr>`;
});
const Trash_2 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M3 6h18" }],
    [
      "path",
      {
        "d": "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"
      }
    ],
    [
      "path",
      {
        "d": "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"
      }
    ],
    [
      "line",
      {
        "x1": "10",
        "x2": "10",
        "y1": "11",
        "y2": "17"
      }
    ],
    [
      "line",
      {
        "x1": "14",
        "x2": "14",
        "y1": "11",
        "y2": "17"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "trash-2" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Trash2 = Trash_2;
const Alert_dialog_title = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "level"]);
  let { class: className = void 0 } = $$props;
  let { level = "h3" } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.level === void 0 && $$bindings.level && level !== void 0)
    $$bindings.level(level);
  return `${validate_component(Alert_dialog_title$1, "AlertDialogPrimitive.Title").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-lg font-semibold", className)
      },
      { level },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Alert_dialog_action = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Alert_dialog_action$1, "AlertDialogPrimitive.Action").$$render($$result, Object.assign({}, { class: cn(buttonVariants(), className) }, $$restProps), {}, {
    default: ({ builder }) => {
      return `${slots.default ? slots.default({ builder }) : ``}`;
    }
  })}`;
});
const Alert_dialog_cancel = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Alert_dialog_cancel$1, "AlertDialogPrimitive.Cancel").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)
      },
      $$restProps
    ),
    {},
    {
      default: ({ builder }) => {
        return `${slots.default ? slots.default({ builder }) : ``}`;
      }
    }
  )}`;
});
const Alert_dialog_portal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, []);
  return `${validate_component(Alert_dialog_portal$1, "AlertDialogPrimitive.Portal").$$render($$result, Object.assign({}, $$restProps), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Alert_dialog_footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Alert_dialog_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `<div${spread(
    [
      {
        class: escape_attribute_value(cn("flex flex-col space-y-2 text-center sm:text-left", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</div>`;
});
const Alert_dialog_overlay = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class", "transition", "transitionConfig"]);
  let { class: className = void 0 } = $$props;
  let { transition = fade } = $$props;
  let { transitionConfig = { duration: 150 } } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  return `${validate_component(Alert_dialog_overlay$1, "AlertDialogPrimitive.Overlay").$$render(
    $$result,
    Object.assign(
      {},
      { transition },
      { transitionConfig },
      {
        class: cn("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm ", className)
      },
      $$restProps
    ),
    {},
    {}
  )}`;
});
const Alert_dialog_content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["transition", "transitionConfig", "class"]);
  let { transition = flyAndScale } = $$props;
  let { transitionConfig = void 0 } = $$props;
  let { class: className = void 0 } = $$props;
  if ($$props.transition === void 0 && $$bindings.transition && transition !== void 0)
    $$bindings.transition(transition);
  if ($$props.transitionConfig === void 0 && $$bindings.transitionConfig && transitionConfig !== void 0)
    $$bindings.transitionConfig(transitionConfig);
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Alert_dialog_portal, "AlertDialog.Portal").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Alert_dialog_overlay, "AlertDialog.Overlay").$$render($$result, {}, {}, {})} ${validate_component(Alert_dialog_content$1, "AlertDialogPrimitive.Content").$$render(
        $$result,
        Object.assign(
          {},
          { transition },
          { transitionConfig },
          {
            class: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full", className)
          },
          $$restProps
        ),
        {},
        {
          default: () => {
            return `${slots.default ? slots.default({}) : ``}`;
          }
        }
      )}`;
    }
  })}`;
});
const Alert_dialog_description = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0)
    $$bindings.class(className);
  return `${validate_component(Alert_dialog_description$1, "AlertDialogPrimitive.Description").$$render(
    $$result,
    Object.assign(
      {},
      {
        class: cn("text-sm text-muted-foreground", className)
      },
      $$restProps
    ),
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}`;
});
const Root = Alert_dialog;
const Trigger = Alert_dialog_trigger;
let items = {};
const { subscribe, set, update } = writable(items);
const addItem = (item) => {
  let cart_item = items[item.id];
  update((items2) => {
    cart_item === void 0 ? items2[item.id] = { amount: 1, product: { ...item } } : items2[item.id].amount += 1;
    return items2;
  });
};
const change = (item, amount) => {
  let cart_item = items[item.product.id];
  if (cart_item === void 0) {
    return;
  }
  const new_amount = Number(amount) < 1 ? 1 : Number(amount);
  update((items2) => {
    cart_item.amount = new_amount;
    return items2;
  });
};
const remove = (id) => {
  update((items2) => {
    delete items2[id];
    return items2;
  });
};
const reset = () => {
  items = {};
  set(items);
};
const warenkorb = {
  subscribe,
  addItem,
  change,
  remove,
  reset
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $warenkorb, $$unsubscribe_warenkorb;
  $$unsubscribe_warenkorb = subscribe$1(warenkorb, (value) => $warenkorb = value);
  $$unsubscribe_warenkorb();
  return `<div class="flex flex-col gap-6 p-4 sm:px-6 sm:py-0 md:grid md:grid-cols-2 md:gap-8"><div class="col-span-1 flex flex-col gap-8">${slots.default ? slots.default({}) : ``}</div> ${validate_component(Separator, "Separator").$$render($$result, { class: "md:hidden" }, {}, {})}  <aside class="2xl:checkout-xl md:checkout-lg flex w-full flex-col gap-4 rounded-xl border bg-background p-4"><h5 class="mx-auto text-xl font-bold" data-svelte-h="svelte-1r0g28a">Warenkorb</h5> ${validate_component(Table, "Table.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Table_caption, "Table.Caption").$$render($$result, {}, {}, {
        default: () => {
          return `Inhalt des Warenkorbs`;
        }
      })} ${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `Löschen`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "w-[100px]" }, {}, {
                default: () => {
                  return `Name`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                default: () => {
                  return `Menge`;
                }
              })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-right" }, {}, {
                default: () => {
                  return `Preis`;
                }
              })}`;
            }
          })}`;
        }
      })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
        default: () => {
          return `${each(Object.values($warenkorb), (korb, i) => {
            return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Root, "AlertDialog.Root").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Trigger, "AlertDialog.Trigger").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Trash2, "Trash2").$$render(
                              $$result,
                              {
                                class: "h-5 w-5 cursor-pointer hover:text-destructive"
                              },
                              {},
                              {}
                            )}`;
                          }
                        })} ${validate_component(Alert_dialog_content, "AlertDialog.Content").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Alert_dialog_header, "AlertDialog.Header").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(Alert_dialog_title, "AlertDialog.Title").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `Löschen?`;
                                  }
                                })} `;
                              }
                            })} ${validate_component(Alert_dialog_footer, "AlertDialog.Footer").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(Alert_dialog_cancel, "AlertDialog.Cancel").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `Zurück`;
                                  }
                                })} ${validate_component(Alert_dialog_action, "AlertDialog.Action").$$render($$result, {}, {}, {
                                  default: () => {
                                    return `Löschen`;
                                  }
                                })} `;
                              }
                            })} `;
                          }
                        })} `;
                      }
                    })} `;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "font-medium" }, {}, {
                  default: () => {
                    return `${escape(korb.product.name)}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                  default: () => {
                    return `${validate_component(Input, "Input").$$render(
                      $$result,
                      {
                        type: "number",
                        min: "1",
                        class: "w-16",
                        value: korb.amount
                      },
                      {},
                      {}
                    )}`;
                  }
                })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-right" }, {}, {
                  default: () => {
                    return `<p>${escape((korb.product.price * korb.amount).toFixed(2))}€</p> <p class="text-xs text-muted-foreground">${escape(korb.product.price.toFixed(2))}€</p> `;
                  }
                })} `;
              }
            })}`;
          })} ${validate_component(Table_row, "Table.Row").$$render($$result, { class: "bg-secondary" }, {}, {
            default: () => {
              return `${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {})} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                default: () => {
                  return `Summe`;
                }
              })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {})} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-right" }, {}, {
                default: () => {
                  return `${escape(Object.values($warenkorb).map((entry) => entry.amount * entry.product.price).reduce((partial, v) => partial + v, 0).toFixed(2))}€`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })} <div class="mx-auto my-2 flex w-64 flex-col gap-2">${validate_component(Button, "Button").$$render($$result, { class: "w-full" }, {}, {
    default: () => {
      return `Erfassen`;
    }
  })} ${validate_component(Root, "AlertDialog.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Trigger, "AlertDialog.Trigger").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Button, "Button").$$render($$result, { variant: "secondary", class: "w-full" }, {}, {
            default: () => {
              return `Löschen`;
            }
          })}`;
        }
      })} ${validate_component(Alert_dialog_content, "AlertDialog.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Alert_dialog_header, "AlertDialog.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Alert_dialog_title, "AlertDialog.Title").$$render($$result, {}, {}, {
                default: () => {
                  return `Löschen?`;
                }
              })} ${validate_component(Alert_dialog_description, "AlertDialog.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `Aktion kann nicht rückgängig gemacht werden. Sind Sie sich sicher?`;
                }
              })}`;
            }
          })} ${validate_component(Alert_dialog_footer, "AlertDialog.Footer").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Alert_dialog_cancel, "AlertDialog.Cancel").$$render($$result, {}, {}, {
                default: () => {
                  return `Zurück`;
                }
              })} ${validate_component(Alert_dialog_action, "AlertDialog.Action").$$render($$result, {}, {}, {
                default: () => {
                  return `Löschen`;
                }
              })}`;
            }
          })}`;
        }
      })}`;
    }
  })}</div></aside></div>`;
});
export {
  Layout as default
};
