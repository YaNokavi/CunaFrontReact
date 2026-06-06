export const IconArrow = ({ isRotate = false }) => {
  return (
    <svg
      style={isRotate ? { transform: "rotate(180deg)" } : null}
      width="14"
      height="14"
      viewBox="0 0 13 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.03409 12.4467L0.178267 6.59091L6.03409 0.735085L7.2777 1.96662L3.55291 5.69141H12.6023V7.49041H3.55291L7.2777 11.2092L6.03409 12.4467Z"
        fill="currentColor"
      />
    </svg>
  );
};
