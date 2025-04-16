import { create } from 'zustand';
interface ThemeState {
  isDarkMode: boolean
  primaryColor: string
  secondaryColor: string
  toggleTheme: () => void
  setPrimaryColor: (color: string) => void
  setSecondaryColor: (color: string) => void
}
export const useThemeStore = create<ThemeState>()((set) => ({

  isDarkMode: false,
  primaryColor: "#5855FF",
  secondaryColor: "#FF914D",
  toggleTheme: () =>
    useThemeStore.setState(state => ({
      isDarkMode: !state.isDarkMode
    })),
  setPrimaryColor: (color: string) =>
    useThemeStore.setState({ primaryColor: color }),
  setSecondaryColor: (color: string) =>
    useThemeStore.setState({ secondaryColor: color }),


}
  // "theme",
  // true
))