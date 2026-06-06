import { memo, useEffect, useRef, useState } from "react";

interface ReviewType {
  type: string;
  name: string;
  index: number;
}

interface Props {
  sortType: string;
  setSortType: (type: string) => void;
}

function SortingBlockButtons({ sortType, setSortType }: Props) {
  const sortingBlockRef = useRef<HTMLDivElement>(null);

  const reviewTypes: ReviewType[] = [
    { type: "NEW_FIRST", name: "Новые", index: 0 },
    { type: "POSITIVE_FIRST", name: "Хорошие", index: 1 },
    { type: "NEGATIVE_FIRST", name: "Плохие", index: 2 },
    { type: "USEFUL_FIRST", name: "Полезные", index: 3 },
  ];

  const [activeIndex, setActiveIndex] = useState(
    reviewTypes.find((type) => type.type === sortType)!.index
  );

  const getActiveClass = (index: number) => (activeIndex === index ? "active" : "");

  useEffect(() => {
    if (sortingBlockRef.current) {
      sortingBlockRef.current.style.setProperty(
        "--pseudo-x",
        `${activeIndex * 100}%`
      );
    }
  }, [activeIndex]);

  const handleClickSortingButton = (index: number) => {
    if (activeIndex === index) return;
    setActiveIndex(index);
    setSortType(reviewTypes[index].type);
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
