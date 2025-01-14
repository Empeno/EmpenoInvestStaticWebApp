import { useState, useEffect, useContext } from "react";
import { MdSunny, MdBedtime } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";

const ThemeSwitch = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [isNightMode, setIsNightMode] = useState<boolean>(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme === "night" : false; // Default to "emerald"
  });

  useEffect(() => {
    // Set the theme based on state
    const theme = isNightMode ? "night" : "cmyk";
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [isNightMode]);

  // Toggle between themes
  const toggleTheme = () => {
    setIsNightMode((prev) => !prev);
  };

  return (
    <label className="swap swap-rotate w-full">
      {/* Hidden Checkbox */}
      <input type="checkbox" className="theme-controller" checked={isNightMode} onChange={toggleTheme} />

      {/* Sun Icon (Emerald Mode) */}
      <div className="swap-on md:text-xl flex items-center justify-center fill-current">
        <MdSunny size={25} />
      </div>

      {/* Moon Icon (Night Mode) */}
      <div className="swap-off md:text-xl flex items-center justify-center fill-current">
        <MdBedtime size={25} />
      </div>
      {isAuthenticated && <>{isNightMode ? "Light" : "Night"}</>}
    </label>
  );
};

export default ThemeSwitch;
