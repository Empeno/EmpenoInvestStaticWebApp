import {
  MdAdminPanelSettings,
  MdInsertChart,
  MdListAlt,
  MdSettings,
  MdSpaceDashboard,
} from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import ProfileTab from '../components/ProfileTab';
import LoginModal from '../components/auth/LoginModal';
import logoBlack from '../../public/EmpenoInvestBlack.png';
import logoWhite from '../../public/EmpenoInvestWhite.png';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  return (
    <div className="flex md:flex-col justify-between items-center md:h-full bg-base-100 rounded-lg  md:fixed py-5 pr-5 md:py-0 md:pr-0">
      <div className="flex flex-col md:gap-7">
        <div className="pl-7 md:px-7 md:py-9 w-40 md:w-52">
          <img
            src={theme === 'light' ? logoBlack : logoWhite}
            alt="Empeno Logo"
            className=""
          />
        </div>
        <div className=" hidden md:flex flex-col">
          <span className="text-sm text-gray-400 font-bold pl-6">Overview</span>
          <ul className="menu rounded-box w-56 menu-lg tracking-wide gap-2">
            <li>
              <NavLink to="/">
                <MdSpaceDashboard />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/analytics">
                <MdInsertChart />
                Analytics
              </NavLink>
            </li>
          </ul>
        </div>
        {isAuthenticated && (
          <div className=" hidden md:flex flex-col">
            <ul className="menu rounded-box w-56 menu-lg tracking-wide gap-2">
              <li>
                <NavLink to="/admin">
                  <MdListAlt />
                  Admin
                </NavLink>
              </li>
              <li>
                <NavLink to="/settings">
                  <MdSettings />
                  Settings
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex md:hidden fixed bottom-7 left-1/2 transform -translate-x-1/2 w-full justify-center">
        <ul className="menu menu-horizontal menu-lg bg-base-200 rounded-box">
          <li>
            <NavLink to="/">
              <MdSpaceDashboard size={25} />
            </NavLink>
          </li>
          <li>
            <NavLink to="/analytics">
              <MdInsertChart size={25} />
            </NavLink>
          </li>
          {isAuthenticated && (
            <li>
              <NavLink to="/admin">
                <MdAdminPanelSettings size={25} />
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <span className="text-gray-500 text-xs p-5 hidden md:flex">
        © Empeno 2025
      </span>
      <div className="flex md:hidden">
        {isAuthenticated && <ProfileTab />} {!isAuthenticated && <LoginModal />}
      </div>
    </div>
  );
};

export default Navbar;
