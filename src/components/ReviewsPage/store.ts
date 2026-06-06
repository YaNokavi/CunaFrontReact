import { create } from "zustand";

interface ReviewAreaStore {
  isWriting: boolean;
  comment: string;
  userRating: number;
  actions: {
    setIsWriting: (isWriting: boolean) => void;
    setComment: (comment: string) => void;
    setUserRating: (userRating: number) => void;
  };
}

const useReviewAreaStore = create<ReviewAreaStore>((set) => ({
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
