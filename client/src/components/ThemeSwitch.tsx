// src/components/ThemeSwitch.tsx
import { useContext } from 'react';
import { MdSunny, MdBedtime } from 'react-icons/md';
import { ThemeContext } from '../context/ThemeContext';

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="swap swap-rotate w-full">
      {/* Hidden Checkbox */}
      <input
        type="checkbox"
        className="theme-controller"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />

      {/* Sun Icon */}
      <div className="swap-on md:text-xl flex items-center justify-center fill-current">
        <MdSunny size={25} />
      </div>

      {/* Moon Icon */}
      <div className="swap-off md:text-xl flex items-center justify-center fill-current">
        <MdBedtime size={25} />
      </div>
    </label>
  );
};

export default ThemeSwitch;
