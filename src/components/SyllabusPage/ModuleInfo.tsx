import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

export default function ModuleInfo({ module }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    if (!wrapRef.current) return;

    if (!open) {
      // Открываем: снимаем ограничение высоты
      wrapRef.current.style.maxHeight = "none";
      setOpen(true);
    } else {
      // Закрываем: фиксируем текущую высоту в px, затем обнуляем
      const current = wrapRef.current.scrollHeight;
      wrapRef.current.style.maxHeight = current + "px";
      // Следующий кадр — переход к 0 запустит CSS transition
      requestAnimationFrame(() => {
        if (wrapRef.current) wrapRef.current.style.maxHeight = "0px";
      });
      setOpen(false);
    }
  };

  return (
    <>
      <div
        className={`${styles.main} ${open ? styles.mainOpen : ""}`}
        onClick={toggle}
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
      <div
        ref={wrapRef}
        className={styles.aditional}
        style={{
          maxHeight: 0,
          opacity: open ? 1 : 0,
        }}
      >
        {module.submodules.map((submodule) => (
          <Link key={submodule.id} to={`${submodule.id}/step/1`}>
            {module.number}.{submodule.number} {submodule.name}
            <span>
              {submodule.completedStepsCount}/{submodule.totalStepsCount}
            </span>
          </Link>
        ))}
      </div>
    </>
  );
}
