import { useContext } from "react";
import { MdLogout, MdSettings } from "react-icons/md";
import { AuthContext } from "../context/AuthContext";
import ThemeSwitch from "../elements/ThemeSwitch";

const ProfileTab = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div tabIndex={0} role="button" className="flex items-center gap-2">
        <span className="text-sm">Marc</span>
        <div className="avatar placeholder">
          <div className="bg-neutral text-neutral-content w-10 rounded-full">
            <span className="text-sm">UI</span>
          </div>
        </div>
      </div>
      <ul tabIndex={0} className="dropdown-content mt-1 menu bg-base-200 rounded-box z-[1] w-44 shadow">
        <li>
          <ThemeSwitch />
        </li>
        <li>
          <button className="btn">
            <MdSettings size={25} />
            Settings
          </button>
        </li>
        <li>
          <button onClick={logout} className="btn">
            <MdLogout size={25} /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileTab;
