import { useEffect, useRef } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import type { ReactElement } from "react";
import { useIView, isLargeImage } from "../../hooks/useIView";
import IViewOverlay from "../../UI/IViewOverlay";

export default function SanitizedHTML({
  content,
}: {
  content: string;
}): ReactElement {
  const { ref, iview, closeIView } = useIView<HTMLDivElement>();
  const containerRef = useRef<HTMLDivElement>(null);

  const cleanHTML = DOMPurify.sanitize(content);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll<HTMLImageElement>("img");

    const applyStyles = (img: HTMLImageElement) => {
      // Сбрасываем старые атрибуты от предыдущего рендера
      img.removeAttribute("data-iview");
      img.removeAttribute("data-src");
      img.style.cursor = "";

      if (isLargeImage(img)) {
        // Крупное — открывается в просмотрщике
        img.setAttribute("data-iview", "");
        img.setAttribute("data-src", img.src);
        img.style.cursor = "zoom-in";
        img.style.alignSelf = "center";
        img.style.marginTop = "1em";
      } else {
        // Стикер / инлайн-иконка — явно запрещаем iview
        img.setAttribute("data-iview", "disable");
        img.style.verticalAlign = "middle";
        img.style.margin = "0 5px";
      }
    };

    images.forEach((img) => {
      if (img.complete && img.naturalWidth > 0) {
        applyStyles(img);
      } else {
        img.onload = () => applyStyles(img);
        img.onerror = () => img.setAttribute("data-iview", "disable");
      }
    });
  }, [content]);

  const setRefs = (node: HTMLDivElement | null) => {
    (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
    (ref as (n: HTMLDivElement | null) => void)(node);
  };

  return (
    <>
      <div ref={setRefs} className="step-block-content-media">
        {parse(cleanHTML)}
      </div>
      {iview && (
        <IViewOverlay src={iview.src} alt={iview.alt} onClose={closeIView} />
      )}
    </>
  );
}
