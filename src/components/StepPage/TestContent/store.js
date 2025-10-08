import { create } from "zustand";

const useTestStore = create((set) => ({
  testData: {},
  isChecked: false,
  isInputsDisabled: false,
  isWrongAnswer: null,
  selectedOptions: [],

  actions: {
    setTestData: (testData) => set({ testData }),
    setIsChecked: (isChecked) => set({ isChecked }),
    setIsInputsDisabled: (isInputsDisabled) => set({ isInputsDisabled }),
    setIsWrongAnswer: (isWrongAnswer) => set({ isWrongAnswer }),
    setSelectedOptions: (selectedOptions) => set({ selectedOptions }),
  },
}));

export const useTestData = () => useTestStore((state) => state.testData);

export const useIsChecked = () => useTestStore((state) => state.isChecked);

export const useIsInputsDisabled = () =>
  useTestStore((state) => state.isInputsDisabled);

export const useIsWrongAnswer = () =>
  useTestStore((state) => state.isWrongAnswer);

export const useSelectedOptions = () =>
  useTestStore((state) => state.selectedOptions);

export const useActions = () => useTestStore((state) => state.actions);
