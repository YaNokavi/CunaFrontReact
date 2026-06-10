import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";

interface Props {
  src: string;
  alt?: string;
  onClose: () => void;
}

export default function IViewOverlay({ src, alt, onClose }: Props) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const scaleRef = useRef(1);
  const dragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);

  // Fade-in
  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const close = () => onClose();

  // Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Wheel — нативный листенер с passive:false, чтобы preventDefault работал в Chrome
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const next = Math.min(10, Math.max(1, scaleRef.current - e.deltaY * 0.001));
      scaleRef.current = next;
      setScale(next);
    };

    img.addEventListener("wheel", handler, { passive: false });
    return () => img.removeEventListener("wheel", handler);
  }, []);

  // Drag
  const handlePointerDown = (e: React.PointerEvent) => {
    if (scaleRef.current <= 1) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, ox: offset.x, oy: offset.y };
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current) return;
    setOffset({
      x: dragRef.current.ox + e.clientX - dragRef.current.startX,
      y: dragRef.current.oy + e.clientY - dragRef.current.startY,
    });
  };
  const handlePointerUp = () => { dragRef.current = null; };

  // Двойной тап — сброс
  const handleDoubleClick = () => {
    scaleRef.current = 1;
    setScale(1);
    setOffset({ x: 0, y: 0 });
  };

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div
      className={`${styles.overlay} ${visible ? styles.visible : ""}`}
      onClick={close}
    >
      <button className={styles.closer} onClick={close} aria-label="Закрыть">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12"/>
        </svg>
      </button>

      <img
        ref={imgRef}
        className={styles.image}
        src={src}
        alt={alt ?? ""}
        draggable={false}
        style={{
          transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
          cursor: scale > 1 ? "grab" : "zoom-in",
        }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={handleDoubleClick}
      />
    </div>,
    modalRoot,
  );
}
