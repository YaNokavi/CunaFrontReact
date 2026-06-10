import { useEffect, useRef, useState } from "react";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import type { ReactElement } from "react";
import { isLargeImage } from "../../hooks/useIView";
import IViewOverlay from "../../UI/IViewOverlay";

export default function SanitizedHTML({
  content,
}: {
  content: string;
}): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [iview, setIView] = useState<{ src: string; alt: string } | null>(null);

  const cleanHTML = DOMPurify.sanitize(content);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll<HTMLImageElement>("img");

    const applyStyles = (img: HTMLImageElement) => {
      img.removeAttribute("data-iview");
      img.removeAttribute("data-src");
      img.style.cursor = "";

      if (isLargeImage(img)) {
        img.setAttribute("data-iview", "enable");
        img.style.cursor = "zoom-in";
        img.style.alignSelf = "center";
        img.style.marginTop = "1em";
      } else {
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

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest("[data-iview]") as HTMLImageElement | null;
    if (!target) return;
    if (target.getAttribute("data-iview") !== "enable") return;
    const src = target.src ?? "";
    const alt = target.alt ?? "";
    if (src) setIView({ src, alt });
  };

  return (
    <>
      <div
        ref={containerRef}
        className="step-block-content-media"
        onClick={handleClick}
      >
        {parse(cleanHTML)}
      </div>
      {iview && (
        <IViewOverlay
          src={iview.src}
          alt={iview.alt}
          onClose={() => setIView(null)}
        />
      )}
    </>
  );
}
