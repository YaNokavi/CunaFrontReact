import { create } from "zustand";
//TODO best practise
export const useCourseStore = create((set) => ({
  openModules: {},
  favorite: false,
  setFavorite: (favorite) => set({ favorite }),

  setAllModulesOpen: (modulesInfo) =>
    set({
      openModules: modulesInfo.reduce((acc, _, index) => {
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
