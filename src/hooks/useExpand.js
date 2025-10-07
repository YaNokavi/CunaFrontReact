import { useContext } from "react";
import { ExpandContext } from "../context/ExpandContext";

export function useExpand() {
  return useContext(ExpandContext);
}
