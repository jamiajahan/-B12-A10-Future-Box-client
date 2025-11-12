import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext(null);

const ThemeProvider = ({ children }) => {
  // Get theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Effect to update localStorage and <html> tag when theme changes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    const html = document.documentElement;
    
    // Add or remove the 'dark' class from the <html> element
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const themeInfo = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeInfo}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;