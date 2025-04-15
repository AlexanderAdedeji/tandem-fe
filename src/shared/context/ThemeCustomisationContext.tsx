import React, { useEffect, useState, createContext, useContext } from "react";
export type ColorPalette = {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  label: string;
  darkPrimary: string;
  darkSecondary: string;
  darkAccent: string;
  isCustom?: boolean;
};
const colorPalettes: ColorPalette[] = [
  {
    id: "default",
    name: "Classic Blue",
    primary: "#5855FF",
    secondary: "#2B2C5D",
    accent: "#FF914D",
    label: "Default theme with a professional look",
    darkPrimary: "#FF914D",
    darkSecondary: "#2B2C5D",
    darkAccent: "#5855FF",
  },
  {
    id: "emerald",
    name: "Emerald Green",
    primary: "#10B981",
    secondary: "#065F46",
    accent: "#34D399",
    label: "Fresh and natural green theme",
    darkPrimary: "#34D399",
    darkSecondary: "#065F46",
    darkAccent: "#10B981",
  },
  {
    id: "ruby",
    name: "Ruby Red",
    primary: "#EF4444",
    secondary: "#991B1B",
    accent: "#F87171",
    label: "Bold and energetic red theme",
    darkPrimary: "#F87171",
    darkSecondary: "#991B1B",
    darkAccent: "#EF4444",
  },
  {
    id: "amethyst",
    name: "Amethyst Purple",
    primary: "#8B5CF6",
    secondary: "#5B21B6",
    accent: "#A78BFA",
    label: "Elegant purple theme",
    darkPrimary: "#A78BFA",
    darkSecondary: "#5B21B6",
    darkAccent: "#8B5CF6",
  },
  {
    id: "ocean",
    name: "Ocean Blue",
    primary: "#0EA5E9",
    secondary: "#0369A1",
    accent: "#38BDF8",
    label: "Calming ocean theme",
    darkPrimary: "#38BDF8",
    darkSecondary: "#0369A1",
    darkAccent: "#0EA5E9",
  },
  {
    id: "sunset",
    name: "Sunset Orange",
    primary: "#F97316",
    secondary: "#9A3412",
    accent: "#FB923C",
    label: "Warm sunset theme",
    darkPrimary: "#FB923C",
    darkSecondary: "#9A3412",
    darkAccent: "#F97316",
  },
];
interface ThemeCustomizationContextType {
  isDarkMode: boolean;
  selectedPalette: ColorPalette;
  colorPalettes: ColorPalette[];
  setColorPalette: (paletteId: string) => void;
  setIsDarkMode: (isDark: boolean) => void;
  toggleTheme: () => void;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  addCustomPalette: (palette: ColorPalette) => void;
  updateCustomPalette: (palette: ColorPalette) => void;
  deleteCustomPalette: (paletteId: string) => void;
}
const ThemeCustomizationContext = createContext<ThemeCustomizationContextType>({
  isDarkMode: false,
  selectedPalette: colorPalettes[0],
  colorPalettes,
  setColorPalette: () => {},
  setIsDarkMode: () => {},
  toggleTheme: () => {},
  colors: {
    primary: colorPalettes[0].primary,
    secondary: colorPalettes[0].secondary,
    accent: colorPalettes[0].accent,
  },

  addCustomPalette: (palette: ColorPalette) => {},
  updateCustomPalette: (palette: ColorPalette) => {},
  deleteCustomPalette: (paletteId: string) => {},
});
export const useThemeCustomization = () =>
  useContext(ThemeCustomizationContext);
export const ThemeCustomizationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedPalette, setSelectedPalette] = useState<ColorPalette>(
    colorPalettes[0]
  );
  const [customPalettes, setCustomPalettes] = useState<ColorPalette[]>([]);
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  useEffect(() => {
    const savedPalette = localStorage.getItem("colorPalette");
    const savedTheme = localStorage.getItem("theme");
    const savedCustomPalettes = localStorage.getItem("customPalettes");
    if (savedCustomPalettes) {
      setCustomPalettes(JSON.parse(savedCustomPalettes));
    }
    if (savedPalette) {
      const allPalettes = [
        ...colorPalettes,
        ...JSON.parse(savedCustomPalettes || "[]"),
      ];
      const palette = allPalettes.find((p) => p.id === savedPalette);
      if (palette) setSelectedPalette(palette);
    }
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(prefersDark);
    }
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    const colors = isDarkMode
      ? {
          primary: selectedPalette.darkPrimary,
          secondary: selectedPalette.darkSecondary,
          accent: selectedPalette.darkAccent,
        }
      : {
          primary: selectedPalette.primary,
          secondary: selectedPalette.secondary,
          accent: selectedPalette.accent,
        };
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("colorPalette", selectedPalette.id);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, selectedPalette]);
  const setColorPalette = (paletteId: string) => {
    const allPalettes = [...colorPalettes, ...customPalettes];
    const palette = allPalettes.find((p) => p.id === paletteId);
    if (palette) setSelectedPalette(palette);
  };
  const addCustomPalette = (palette: ColorPalette) => {
    setCustomPalettes([...customPalettes, palette]);
    setSelectedPalette(palette);
  };
  const updateCustomPalette = (updatedPalette: ColorPalette) => {
    setCustomPalettes(
      customPalettes.map((p) =>
        p.id === updatedPalette.id ? updatedPalette : p
      )
    );
    setSelectedPalette(updatedPalette);
  };
  const deleteCustomPalette = (paletteId: string) => {
    setCustomPalettes(customPalettes.filter((p) => p.id !== paletteId));
    if (selectedPalette.id === paletteId) {
      setSelectedPalette(colorPalettes[0]);
    }
  };
  const colors = isDarkMode
    ? {
        primary: selectedPalette.darkPrimary,
        secondary: selectedPalette.darkSecondary,
        accent: selectedPalette.darkAccent,
      }
    : {
        primary: selectedPalette.primary,
        secondary: selectedPalette.secondary,
        accent: selectedPalette.accent,
      };
  useEffect(() => {
    localStorage.setItem("customPalettes", JSON.stringify(customPalettes));
  }, [customPalettes]);
  return (
    <ThemeCustomizationContext.Provider
      value={{
        isDarkMode,
        selectedPalette,
        colorPalettes: [...colorPalettes, ...customPalettes],
        setColorPalette,
        setIsDarkMode,
        toggleTheme,
        colors,
        addCustomPalette,
        updateCustomPalette,
        deleteCustomPalette,
      }}
    >
      {children}
    </ThemeCustomizationContext.Provider>
  );
};
