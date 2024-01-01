"use client";

import { getItemStorage, setItemStorage } from "@/utils/localStore";
import { createContext, useContext, useEffect, useState } from "react";

// create context
const defaultValue = {
  state: "dark" as const,
  toggleThemeState: () => {},
};

interface ThemeContextI {
  state: "light" | "dark";
  toggleThemeState: () => void;
}

export const themeContext = createContext<ThemeContextI>(defaultValue);
// create provider
export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeToggle, setThemeToggle] = useState<"light" | "dark">(
    getItemStorage("theme", "dark")
  );
  const toggleTheme = () => {
    setThemeToggle((theme: "dark" | "light") =>
      theme === "light" ? "dark" : "light"
    );
  };
  useEffect(() => {
    setItemStorage("theme", themeToggle);
  }, [themeToggle]);

  return (
    <themeContext.Provider
      value={{ state: themeToggle, toggleThemeState: toggleTheme }}
    >
      <div className='h-full overflow-hidden' data-theme={themeToggle}>
        {children}
      </div>
    </themeContext.Provider>
  );
}

// create utility hooks
export const useThemeState = () => useContext(themeContext).state;
export const useThemeDispatch = () => useContext(themeContext).toggleThemeState;
