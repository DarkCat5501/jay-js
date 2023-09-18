import { mergeClasses } from "../../utils";
import { Box, IBox } from "../Box";
import { useDrawerToggle } from "../Drawer";

interface IDrawerOverlay extends IBox {
  for: string;
}

export function DrawerOverlay({
  ...props
}: IDrawerOverlay ): HTMLDivElement {
  const className = mergeClasses([
    "transition-opacity",
    "ease-in-out",
    "duration-300",
    "opacity-0",
    "fixed",
    "inset-0",
    "bg-black/30",
    "z-10",
    props.className
  ]);

  const drawerToggle = useDrawerToggle({ for: props.for });

  return Box({
    ...props,
    className,
    dataset: {
      drawerFor: props.for
    },
    onclick: drawerToggle
  });
}