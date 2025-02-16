interface IUseDrawer {
  for?: string;
  onClose?: () => void;
  onOpen?: () => void;
}

export function useDrawer({
  ...props
}: IUseDrawer) {

  return function () {
    const drawer = document.querySelector(`#${props.for}`);
    if (drawer && drawer instanceof HTMLElement) {
      const drawerOverlay = document.querySelector(`[data-drawer-for="${props.for}"]`);
      const drawerContent = drawer.querySelector(".drawer-content");

      if (drawer.classList.contains("hidden")) {
        drawer.classList.remove("hidden");
        drawer.classList.add("flex");
        if (props.onOpen) {
          props.onOpen();
        }
      } else {
        setTimeout(() => {
          drawer.classList.remove("flex");
          drawer.classList.add("hidden");
          if (props.onClose) {
            props.onClose();
          }
        }, 300);
      }

      setTimeout(() => {
        if (drawerContent && drawerContent instanceof HTMLElement) {

          if (drawerContent.classList.contains("drawer-left")) {
            drawerContent.classList.toggle("-translate-x-full");
          }

          if (drawerContent.classList.contains("drawer-right")) {
            drawerContent.classList.toggle("translate-x-full");
          }

          if (drawerContent.classList.contains("drawer-top")) {
            drawerContent.classList.toggle("-translate-y-full");
          }

          if (drawerContent.classList.contains("drawer-bottom")) {
            drawerContent.classList.toggle("translate-y-full");
          }
          drawerContent.classList.toggle("translate-x-0");
        }

        if (drawerOverlay && drawerOverlay instanceof HTMLElement) {
          drawerOverlay.classList.toggle("opacity-0");
        }
      }, 20);
    }
  };
}
