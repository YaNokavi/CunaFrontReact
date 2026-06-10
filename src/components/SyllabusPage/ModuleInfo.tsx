import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function ModuleInfo({ module }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`${styles.main} ${open ? styles.mainOpen : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span>
          {module.number}. {module.name}
        </span>
        <svg
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      <div className={`${styles.aditional} ${open ? styles.aditionalOpen : ""}`}>
        <div className={styles.aditionalInner}>
          {module.submodules.map((submodule) => (
            <Link key={submodule.id} to={`${submodule.id}/step/1`}>
              {module.number}.{submodule.number} {submodule.name}
              <span>
                {submodule.completedStepsCount}/{submodule.totalStepsCount}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
