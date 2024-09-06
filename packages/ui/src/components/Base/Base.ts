import { uniKey } from "../../utils/uniKey.js";
import { TBase, TBaseTagMap, TStyle } from "./Base.types.js";

export function Base<T extends TBaseTagMap = "div">({
  id,
  tag,
  ref,
  style,
  children,
  dataset,
  className,
  listeners,
  onmount,
  ...props
}: TBase<T> = { tag: "div" }): HTMLElementTagNameMap[T] {
  const base = document.createElement(tag || "div");
  ref && (ref.current = base);
  className && (base.className = className);
  id ? base.id = id : base.id = uniKey();
  listeners && Object.entries(listeners).forEach(([key, value]) => {
    base.addEventListener(key, value as EventListener);
  });

  style && Object.entries(style).forEach(([key, value]: [string, any]) => {
    if (key === "parentRule" || key === "length") return;
    base.style[key as keyof TStyle] = value;
  });

  dataset && Object.entries(dataset).forEach(([key, value]) => {
    base.dataset[key] = value as string;
  });

  onmount && setTimeout(() => onmount(base));

  if (children) {
    if (children instanceof Promise) {
      const elementSlot = document.createElement("jayjs-lazy-slot");
      base.appendChild(elementSlot);
      children
        .then(resolvedChild => {
          elementSlot.replaceWith(resolvedChild);
        })
        .catch(error => {
          console.error("Failed to resolve child promise:", error)
        })
    } else {
      if (Array.isArray(children)) {
        children.forEach((child) => {
          appendChildToBase(base, child);
        });
      } else {
        appendChildToBase(base, children);
      }
    }
  }

  props && Object.entries(props).forEach(([key, value]) => {
    try {
      (base as any)[key] = value;
    } catch (error) {
      if (error instanceof TypeError) {
        console.warn(`JayJS: Cannot set property "${key}" of type "${typeof value}" to "${value}".`);
        throw error;
      }
    }
  });
  return base as HTMLElementTagNameMap[T];
}

function appendChildToBase(base: HTMLElement, child: string | Node | Promise<string | Node>): void {
  if (child instanceof Promise) {
    const elementSlot = document.createElement("jayjs-lazy-slot");
    base.appendChild(elementSlot);
    child.then((resolvedChild) => {
      elementSlot.replaceWith(resolvedChild);
    });
    return;
  }
  if (typeof child === "string") {
    base.appendChild(document.createTextNode(child));
    return;
  }
  base.appendChild(child);
}
