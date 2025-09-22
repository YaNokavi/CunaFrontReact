export const getRacePlaceClass = (place) => {
  let placeClass = "";
  if (place === 1) {
    placeClass = "first";
  } else if (place === 2) {
    placeClass = "second";
  } else if (place === 3) {
    placeClass = "third";
  } else {
    placeClass = "";
  }

  return "list-user-place" + ` ${placeClass}`;
};
