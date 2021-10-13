import create from 'zustand';

export const useStore = create((set) => ({
  isTitle: false,
  setIsTitle: (isTitle) => set({ isTitle }),
}));
