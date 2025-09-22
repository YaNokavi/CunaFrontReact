import styles from "./styles.module.scss";

export default function AnimateIcons({ iconState, setIconState }) {
  const handleAnimationEnd = () => {
    if (iconState === "fadeOut") {
      setIconState("copied");
    } else if (iconState === "fadeOutCopied") {
      setIconState("default");
    }
  };

  return (
    <>
      {["default", "fadeOut"].includes(iconState) && (
        <svg
          className={iconState === "fadeOut" ? styles.fadeOut : styles.fadeIn}
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onAnimationEnd={handleAnimationEnd}
        >
          <path
            d="M16.75 19.4998V20.5832C16.75 21.7799 15.78 22.7499 14.5833 22.7499H5.91667C4.72005 22.7499 3.75 21.7799 3.75 20.5832V11.9164C3.75 10.7199 4.71999 9.74984 5.91658 9.7498L7 9.74976M16.75 9.74989V7.04155M16.75 9.74989V12.4582M16.75 9.74989H14.0417M16.75 9.74989H19.4583M12.4167 3.24976H21.0833C22.28 3.24976 23.25 4.2198 23.25 5.41642V14.0831C23.25 15.2797 22.28 16.2498 21.0833 16.2498H12.4167C11.22 16.2498 10.25 15.2797 10.25 14.0831V5.41642C10.25 4.2198 11.22 3.24976 12.4167 3.24976Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}

      {["copied", "fadeOutCopied"].includes(iconState) && (
        <svg
          className={
            iconState === "fadeOutCopied" ? styles.fadeOut : styles.fadeIn
          }
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onAnimationEnd={handleAnimationEnd}
        >
          <path
            d="M22.5244 4.79211C22.3064 4.79861 22.0995 4.88973 21.9475 5.04616L9.114 17.8797L3.83309 12.5987C3.75576 12.5182 3.66314 12.4539 3.56065 12.4096C3.45817 12.3653 3.34787 12.3419 3.23623 12.3408C3.12458 12.3396 3.01383 12.3608 2.91047 12.403C2.8071 12.4452 2.71319 12.5076 2.63424 12.5866C2.55529 12.6655 2.49289 12.7594 2.45069 12.8628C2.40849 12.9661 2.38734 13.0769 2.38847 13.1885C2.38961 13.3002 2.41301 13.4105 2.4573 13.513C2.5016 13.6155 2.5659 13.7081 2.64644 13.7854L8.52067 19.6596C8.67806 19.8169 8.89147 19.9053 9.114 19.9053C9.33652 19.9053 9.54994 19.8169 9.70732 19.6596L23.1341 6.23281C23.2554 6.11494 23.3382 5.96318 23.3718 5.79742C23.4053 5.63167 23.388 5.45965 23.3221 5.30391C23.2562 5.14817 23.1447 5.01598 23.0024 4.92465C22.8601 4.83333 22.6935 4.78713 22.5244 4.79211Z"
            fill="currentColor"
            stroke="currentColor"
          />
        </svg>
      )}
    </>
  );
}
