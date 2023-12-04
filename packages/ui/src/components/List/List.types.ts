import { BaseElement, IBaseElement } from "../BaseElement/index.js";

export type IList = IBaseElement & Partial<Omit<HTMLUListElement, "style" | "children">>;

export function List({
  ...props
}: IList = {}): HTMLUListElement {
  return BaseElement<IList>({
    tag: "ul",
    ...props
  }) as HTMLUListElement;
}
