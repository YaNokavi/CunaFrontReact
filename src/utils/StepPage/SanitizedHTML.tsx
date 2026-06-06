import parse from "html-react-parser";
import DOMPurify from "dompurify";
import type { ReactElement } from "react";

export default function SanitizedHTML({
  content,
}: {
  content: string;
}): ReactElement {
  const cleanHTML = DOMPurify.sanitize(content);
  return <div className="step-block-content-media">{parse(cleanHTML)}</div>;
}
