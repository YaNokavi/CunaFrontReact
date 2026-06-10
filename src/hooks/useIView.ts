import { useCallback, useState } from "react";

interface IViewState {
  src: string;
  alt: string;
}

export const IVIEW_MIN_HEIGHT = 55;
export const IVIEW_MIN_WIDTH = 100;

export function isLargeImage(img: HTMLImageElement): boolean {
  return img.naturalHeight >= IVIEW_MIN_HEIGHT || img.naturalWidth >= IVIEW_MIN_WIDTH;
}

export function useIView<T extends HTMLElement = HTMLElement>() {
  const [iview, setIView] = useState<IViewState | null>(null);

  const ref = useCallback((node: T | null) => {
    if (!node) return;
    const handler = (e: Event) => {
      const target = (e.target as HTMLElement).closest("[data-iview]") as HTMLImageElement | null;
      if (!target) return;
      // Игнорируем дизаблед элементы (стикеры)
      if (target.getAttribute("data-iview") === "disable") return;
      const src = target.getAttribute("data-src") ?? (target as HTMLImageElement).src ?? "";
      const alt = target.getAttribute("alt") ?? target.getAttribute("data-alt") ?? "";
      if (src) setIView({ src, alt });
    };
    node.addEventListener("click", handler);
  }, []);

  const closeIView = useCallback(() => setIView(null), []);

  return { ref, iview, closeIView };
}
