import { create } from "zustand";
import type { ICourseModulesInfo } from "../../types/CourseTypes/course.types";

interface CourseStore {
  openModules: Record<number, boolean>;
  favorite: boolean;
  setFavorite: (favorite: boolean) => void;
  setAllModulesOpen: (modulesInfo: ICourseModulesInfo[]) => void;
  toggleModuleOpen: (index: number) => void;
}

//TODO best practise
export const useCourseStore = create<CourseStore>((set) => ({
  openModules: {},
  favorite: false,
  setFavorite: (favorite) => set({ favorite }),

  setAllModulesOpen: (modulesInfo) =>
    set({
      openModules: modulesInfo.reduce<Record<number, boolean>>((acc, _, index) => {
        acc[index] = true;
        return acc;
      }, {}),
    }),

  toggleModuleOpen: (index) =>
    set((prevState) => ({
      openModules: {
        ...prevState.openModules,
        [index]: !prevState.openModules[index],
      },
    })),
}));
