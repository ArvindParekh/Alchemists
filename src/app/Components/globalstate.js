
import create from 'zustand';

export const useGlobalState = create((set) => ({
  prompt: '',
  setPrompt: (data) => set({ prompt: data }),
}));

export default useGlobalState;
