import { useCallback, useState } from "react";

interface IViewState {
  src: string;
  alt: string;
}

/**
 * Пороговые размеры изображения, ниже которых оно считается стикером/инлайном элементом.
 * Совпадает с логикой старой реализации (step.js — StepImageController.fixImages):
 *   height >= 55 || width >= 100  →  крупное изображение, добавить iview
 *   иначе                           →  стикер, verticalAlign middle, без iview
 */
export const IVIEW_MIN_HEIGHT = 55;
export const IVIEW_MIN_WIDTH = 100;

export function isLargeImage(img: HTMLImageElement): boolean {
  return img.naturalHeight >= IVIEW_MIN_HEIGHT || img.naturalWidth >= IVIEW_MIN_WIDTH;
}

/**
 * Делегированный обработчик клика по [data-iview] внутри контейнера.
 * Возвращает { ref, iview, closeIView }.
 */
export function useIView<T extends HTMLElement = HTMLElement>() {
  const [iview, setIView] = useState<IViewState | null>(null);

  const ref = useCallback((node: T | null) => {
    if (!node) return;
    const handler = (e: Event) => {
      const target = (e.target as HTMLElement).closest("[data-iview]") as HTMLImageElement | null;
      if (!target) return;
      const src = target.getAttribute("data-src") ?? (target as HTMLImageElement).src ?? "";
      const alt = target.getAttribute("alt") ?? target.getAttribute("data-alt") ?? "";
      if (src) setIView({ src, alt });
    };
    node.addEventListener("click", handler);
  }, []);

  const closeIView = useCallback(() => setIView(null), []);

  return { ref, iview, closeIView };
}
