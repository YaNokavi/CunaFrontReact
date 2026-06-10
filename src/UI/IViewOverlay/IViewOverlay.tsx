import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";

interface Props {
  src: string;
  alt?: string;
  onClose: () => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 6;

export default function IViewOverlay({ src, alt, onClose }: Props) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const imgRef = useRef<HTMLImageElement>(null);
  const scaleRef = useRef(1);
  const offsetRef = useRef({ x: 0, y: 0 });

  // Pointer drag (mouse / single touch через pointer events)
  const dragRef = useRef<{ startX: number; startY: number; ox: number; oy: number } | null>(null);

  // Touch pinch state
  const touchRef = useRef<{
    t1: React.Touch;
    t2: React.Touch;
    startScale: number;
    startOffset: { x: number; y: number };
  } | null>(null);

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

  // Wheel zoom (desktop)
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      const next = Math.min(MAX_SCALE, Math.max(MIN_SCALE, scaleRef.current - e.deltaY * 0.001));
      scaleRef.current = next;
      setScale(next);
    };
    img.addEventListener("wheel", handler, { passive: false });
    return () => img.removeEventListener("wheel", handler);
  }, []);

  // --- Touch events для pinch zoom и pan ---
  const applyTransform = (s: number, ox: number, oy: number) => {
    scaleRef.current = s;
    offsetRef.current = { x: ox, y: oy };
    setScale(s);
    setOffset({ x: ox, y: oy });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      // Начало pinch
      touchRef.current = {
        t1: e.touches[0],
        t2: e.touches[1],
        startScale: scaleRef.current,
        startOffset: { ...offsetRef.current },
      };
    } else if (e.touches.length === 1 && scaleRef.current > 1) {
      // Начало pan (только если уже zoomed)
      dragRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        ox: offsetRef.current.x,
        oy: offsetRef.current.y,
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 2 && touchRef.current) {
      const { t1, t2, startScale, startOffset } = touchRef.current;

      // Начальная и текущая дистанция
      const startDist = Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
      const curDist = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY,
      );

      const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, (startScale * curDist) / startDist));

      // Центр двух пальцев — как якорная точка зума
      const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
      const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
      const startMidX = (t1.clientX + t2.clientX) / 2;
      const startMidY = (t1.clientY + t2.clientY) / 2;

      const ox = startOffset.x + (midX - startMidX);
      const oy = startOffset.y + (midY - startMidY);

      applyTransform(newScale, ox, oy);
    } else if (e.touches.length === 1 && dragRef.current) {
      const ox = dragRef.current.ox + e.touches[0].clientX - dragRef.current.startX;
      const oy = dragRef.current.oy + e.touches[0].clientY - dragRef.current.startY;
      offsetRef.current = { x: ox, y: oy };
      setOffset({ x: ox, y: oy });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) touchRef.current = null;
    if (e.touches.length === 0) dragRef.current = null;

    // Если масштаб вернулся к 1 — сбрасываем офсет
    if (scaleRef.current <= MIN_SCALE + 0.05) {
      applyTransform(MIN_SCALE, 0, 0);
    }
  };

  // Pointer drag (mouse)
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // touch обрабатывается выше
    if (scaleRef.current <= 1) return;
    (e.target as Element).setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, startY: e.clientY, ox: offsetRef.current.x, oy: offsetRef.current.y };
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (!dragRef.current) return;
    const ox = dragRef.current.ox + e.clientX - dragRef.current.startX;
    const oy = dragRef.current.oy + e.clientY - dragRef.current.startY;
    offsetRef.current = { x: ox, y: oy };
    setOffset({ x: ox, y: oy });
  };
  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    dragRef.current = null;
  };

  // Двойной тап / двойной клик — сброс
  const handleDoubleClick = () => {
    applyTransform(MIN_SCALE, 0, 0);
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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />
    </div>,
    modalRoot,
  );
}
