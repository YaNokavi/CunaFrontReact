import { create } from "zustand";

export const useReviewAreaStore = create((set) => ({
  isWriting: false,
  setIsWriting: (isWriting) => set({ isWriting }),

  comment: "",
  setComment: (comment) => set({ comment }),

  userRating: 0,
  setUserRating: (userRating) => set({ userRating }),
}));
