import { useExpand } from "@/hooks/useExpand";

export default function ExpandButton() {
  const { isExpanded, toggleExpand } = useExpand();
  return (
    <button className="button-expand-description" onClick={toggleExpand}>
      <span>{isExpanded ? "Свернуть" : "Раскрыть"}</span>
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.35 3.8999L6.50002 9.7499L0.650024 3.8999"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
}
