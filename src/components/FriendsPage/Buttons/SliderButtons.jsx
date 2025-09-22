import { useCallback, useRef } from "react";

export default function SliderButtons({
  activeIndex,
  setActiveIndex,
  contentSliderRef,
}) {
  const widgetBlockRef = useRef(null);

  const setActivePosition = useCallback(
    (index) => {
      if (!widgetBlockRef.current || !contentSliderRef.current) return;
      const translatePercent = index * 100;
      widgetBlockRef.current.style.setProperty(
        "--pseudo-x",
        `${translatePercent}%`
      );
      if (index === 0) {
        widgetBlockRef.current.style.setProperty("--active-pos", `0%`);
      } else {
        widgetBlockRef.current.style.setProperty("--active-pos", `50%`);
      }
      setActiveIndex(index);

      const translatePercentSlider = -50 * index;
      contentSliderRef.current.style.transform = `translateX(${translatePercentSlider}%)`;
    },
    [contentSliderRef, setActiveIndex]
  );

  const handleButtonClick = (index) => {
    setActivePosition(index);
  };

  const setClass = (index) => {
    return `widget-button ${activeIndex === index ? "active" : ""}`;
  };

  return (
    <div
      className={`block widget-block ${
        activeIndex === 1 ? "active-second" : ""
      }`}
      ref={widgetBlockRef}
      style={{ "--pseudo-x": "0%", "--active-pos": "0%" }}
    >
      <button className={setClass(0)} onClick={() => handleButtonClick(0)}>
        Ваши друзья
      </button>
      <button className={setClass(1)} onClick={() => handleButtonClick(1)}>
        Гонка рефералов
      </button>
    </div>
  );
}
