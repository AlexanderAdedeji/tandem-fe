import React, { useEffect, useState, createContext, useContext } from 'react'
interface ThemeContextType {
  isDarkMode: boolean
  toggleTheme: () => void
}
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
})
export const useTheme = () => useContext(ThemeContext)
export const ThemeProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  useEffect(() => {
    // Check system preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    setIsDarkMode(prefersDark)
    if (prefersDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }
  return (
    <ThemeContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
