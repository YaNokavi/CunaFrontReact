import { create } from "zustand";

const useReviewAreaStore = create((set) => ({
  isWriting: false,

  comment: "",

  userRating: 0,

  actions: {
    setIsWriting: (isWriting) => set({ isWriting }),
    setComment: (comment) => set({ comment }),
    setUserRating: (userRating) => set({ userRating }),
  },
}));

export const useIsWriting = () =>
  useReviewAreaStore((state) => state.isWriting);

export const useComment = () => useReviewAreaStore((state) => state.comment);

export const useUserRating = () =>
  useReviewAreaStore((state) => state.userRating);

export const useActions = () => useReviewAreaStore((state) => state.actions);
