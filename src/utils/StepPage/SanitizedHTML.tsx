import parse from "html-react-parser";
import DOMPurify from "dompurify";
import type { ReactElement } from "react";
import { useIView } from "../../hooks/useIView";
import IViewOverlay from "../../UI/IViewOverlay";

export default function SanitizedHTML({
  content,
}: {
  content: string;
}): ReactElement {
  const { ref, iview, closeIView } = useIView<HTMLDivElement>();

  const cleanHTML = DOMPurify.sanitize(content, {
    ADD_ATTR: ["data-iview", "data-src"],
  });

  // Автоматически проставляем data-iview всем img внутри контента
  const enriched = cleanHTML.replace(
    /<img(\s)/gi,
    '<img data-iview style="cursor:zoom-in"$1',
  );

  return (
    <>
      <div ref={ref} className="step-block-content-media">
        {parse(enriched)}
      </div>
      {iview && (
        <IViewOverlay src={iview.src} alt={iview.alt} onClose={closeIView} />
      )}
    </>
  );
}
