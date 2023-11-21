import { BaseElement, IBaseElement } from "../BaseElement/index.js";
import { mergeClasses } from "../../utils/mergeClasses.js";

export interface IIcon extends IBaseElement {
  icon?: string;
  type?: string;
}

export function Icon({
  icon,
  type,
  ...props
}: IIcon = {}): HTMLElement {
  const className = mergeClasses([
    type,
    icon,
    props.className,
  ]);
  const iconElement = BaseElement({
    tag: "i",
    ...props,
    className,
  });

  return iconElement;
}
