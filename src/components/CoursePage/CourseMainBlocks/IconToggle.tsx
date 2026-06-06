interface Props {
  isOpen: boolean;
}

export default function IconToggle({ isOpen }: Props) {
  return (
    <svg
      width="17"
      height="11"
      viewBox="0 0 17 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`"toggle-icon ${isOpen ? "rotated" : ""}`}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.35907 1.30377L16.1946 8.37502L14.486 10.1425L8.50477 3.95502L2.52352 10.1425L0.814941 8.37502L7.65048 1.30377C7.87708 1.06943 8.18437 0.937784 8.50477 0.937784C8.82518 0.937784 9.13247 1.06943 9.35907 1.30377Z"
        fill="#A6A6A6"
      />
    </svg>
  );
}
