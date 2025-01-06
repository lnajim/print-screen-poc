import { create } from "zustand";

interface PrintScreenStore {
  isLoading: boolean;
  progress: number;
  error: string;
  screenshot: string | null;
  setLoading: (loading: boolean) => void;
  setProgress: (progress: number) => void;
  setError: (error: string) => void;
  setScreenshot: (screenshot: string | null) => void;
}

export const usePrintScreenStore = create<PrintScreenStore>((set) => ({
  isLoading: false,
  progress: 0,
  error: "",
  screenshot: null,
  setLoading: (loading) => set({ isLoading: loading }),
  setProgress: (progress) => set({ progress }),
  setError: (error) => set({ error }),
  setScreenshot: (screenshot) => set({ screenshot }),
}));
