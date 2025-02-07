import { useContext } from 'react';
import ProfileTab from '../components/ProfileTab';
import { AuthContext } from '../context/AuthContext';
import LoginModal from '../components/auth/LoginModal';
import ThemeSwitch from '../components/ThemeSwitch';

interface TopbarProps {
  title: string;
}

const Topbar = ({ title }: TopbarProps) => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="flex w-full p-5 md:p-5 justify-between items-center bg-base-100 rounded-lg shadow-md">
      <span className="md:text-xl font-semibold">{title}</span>
      <div>
        {!isAuthenticated && (
          <div className="flex gap-5">
            <div className="hidden md:flex">
              <LoginModal />
            </div>
            <ThemeSwitch />
          </div>
        )}
        <div className="hidden md:flex">
          {isAuthenticated && <ProfileTab />}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
