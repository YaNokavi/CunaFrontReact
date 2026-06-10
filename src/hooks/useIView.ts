import { useCallback, useState } from "react";

interface IViewState {
  src: string;
  alt: string;
}

/**
 * Делегированный обработчик клика по [data-iview] внутри контейнера.
 * Возвращает { ref, iview, closeIView } — навешивай ref на контейнер,
 * рендери <IViewOverlay> когда iview !== null.
 *
 * Пример:
 *   const { ref, iview, closeIView } = useIView<HTMLDivElement>();
 *   <div ref={ref}>...html с <img data-iview ...>...</div>
 *   {iview && <IViewOverlay src={iview.src} alt={iview.alt} onClose={closeIView} />}
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
    // cleanup через WeakMap не нужен — компонент дестроится вместе с node
  }, []);

  const closeIView = useCallback(() => setIView(null), []);

  return { ref, iview, closeIView };
}
