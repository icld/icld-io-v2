import create from 'zustand';

export const useStore = create((set) => ({
  isTitle: false,
  setIsTitle: (isTitle) => set({ isTitle }),
  aboutIsVisible: false,
  setAboutIsVisible: (aboutIsVisible) => set({ aboutIsVisible }),
}));

export const useModalStore = create((set) => ({
  modalOpen: false,
  setModalOpen: (modalOpen) => set({ modalOpen }),
}));
