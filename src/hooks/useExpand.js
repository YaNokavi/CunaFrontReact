import { useContext } from "react";
import { ExpandContext } from "../context/ReviewPage/ExpandContext";

export function useExpand() {
  return useContext(ExpandContext);
}
