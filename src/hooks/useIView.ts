import { useCallback, useState } from "react";

interface IViewState {
  src: string;
  alt: string;
}

export const IVIEW_MIN_HEIGHT = 55;
export const IVIEW_MIN_WIDTH = 100;

/**
 * Проверяем и HTML-атрибуты, и натуральные размеры:
 * если хотя бы один из них указывает на стикер — это стикер.
 * Крупное: height >= 55 || width >= 100 (по обоим источникам).
 */
export function isLargeImage(img: HTMLImageElement): boolean {
  const attrH = img.getAttribute("height");
  const attrW = img.getAttribute("width");

  const htmlH = attrH ? parseInt(attrH, 10) : null;
  const htmlW = attrW ? parseInt(attrW, 10) : null;

  // Если HTML-атрибуты есть — они точнее всего отражают намеренный размер
  if (htmlH !== null || htmlW !== null) {
    const h = htmlH ?? Infinity;
    const w = htmlW ?? Infinity;
    return h >= IVIEW_MIN_HEIGHT || w >= IVIEW_MIN_WIDTH;
  }

  // Фоллбэк: натуральные размеры
  return img.naturalHeight >= IVIEW_MIN_HEIGHT || img.naturalWidth >= IVIEW_MIN_WIDTH;
}

export function useIView<T extends HTMLElement = HTMLElement>() {
  const [iview, setIView] = useState<IViewState | null>(null);

  const ref = useCallback((node: T | null) => {
    if (!node) return;
    const handler = (e: Event) => {
      const target = (e.target as HTMLElement).closest("[data-iview]") as HTMLImageElement | null;
      if (!target) return;
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
