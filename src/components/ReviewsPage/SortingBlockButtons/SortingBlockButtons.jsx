import { memo, useEffect, useRef, useState } from "react";

function SortingBlockButtons({ refreshReviews, isNeedReset, setIsNeedReset }) {
  const sortingBlockRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // const reviewTypes = [
  //   "NEW_FIRST",
  //   "POSITIVE_FIRST",
  //   "NEGATIVE_FIRST",
  //   "USEFUL_FIRST",
  // ];
  const reviewTypes = [
    { type: "NEW_FIRST", name: "Новые", index: 0 },
    { type: "POSITIVE_FIRST", name: "Хорошие", index: 1 },
    { type: "NEGATIVE_FIRST", name: "Плохие", index: 2 },
    { type: "USEFUL_FIRST", name: "Полезные", index: 3 },
  ];

  const getActiveClass = (index) => (activeIndex === index ? "active" : "");

  useEffect(() => {
    if (sortingBlockRef.current) {
      sortingBlockRef.current.style.setProperty(
        "--pseudo-x",
        `${activeIndex * 100}%`
      );
    }
  }, [activeIndex]);

  useEffect(() => {
    //TODO очень подумать над этим моментом
    if (isNeedReset) {
      setActiveIndex(0);
      setIsNeedReset(false);
    }
  }, [isNeedReset, setIsNeedReset]);

  const handleClickSortingButton = async (index) => {
    if (activeIndex === index) return;
    setActiveIndex(index);

    await refreshReviews(reviewTypes[index].type, true);
  };

  return (
    <div className="sorting-block-swipes" ref={sortingBlockRef}>
      {reviewTypes.map((buttonType) => (
        <button
          key={buttonType.index}
          className={`widget-button ${getActiveClass(buttonType.index)}`}
          onClick={() => handleClickSortingButton(buttonType.index)}
        >
          {buttonType.name}
        </button>
      ))}
    </div>
  );
}

export default memo(SortingBlockButtons);
