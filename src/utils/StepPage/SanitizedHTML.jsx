import parse from "html-react-parser";
import DOMPurify from "dompurify";

export default function SanitizedHTML({ content }) {
  const cleanHTML = DOMPurify.sanitize(content);
  return <div className="step-block-content-media">{parse(cleanHTML)}</div>;
}
