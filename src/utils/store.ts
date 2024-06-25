import { create } from "zustand";
import { persist } from "zustand/middleware";
import { shaders } from "./shaders";

interface TextState {
  currentText: string;
  setCurrentText: (text: string) => void;
  activeTab: boolean;
  setActiveTab: (tab: boolean) => void;
}

export const useTextStore = create<TextState>()(
  persist(
    (set) => ({
      currentText: shaders.vertex,
      setCurrentText: (text: string) => set({ currentText: text }),

      activeTab: true,
      setActiveTab: (tab: boolean) => set({ activeTab: tab }),
    }),
    {
      name: "text-storage",
    }
  )
);
