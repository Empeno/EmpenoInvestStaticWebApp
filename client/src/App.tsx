import { Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './layout/Navbar';
import Topbar from './layout/Topbar';
import Analytics from './pages/Analytics';
import ProtectedRoute from './utils/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Admin from './pages/Admin';
import Settings from './pages/Settings';

interface PageTitleMapping {
  [path: string]: string;
}

const App = () => {
  const location = useLocation();

  const pageTitles: PageTitleMapping = {
    '/': 'Dashboard',
    '/analytics': 'Analytics',
    '/admin': 'Admin',
    '/settings': 'Settings',
  };

  const currentTitle = pageTitles[location.pathname] || 'Default Title';

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex flex-col md:h-lvh bg-base-200 h-dvh">
          <Navbar />
          <main className="p-3 md:p-5 w-full md:pl-[244px] h-full overflow-y-auto flex flex-col gap-3 md:gap-5 pb-28 md:pb-0">
            <Topbar title={currentTitle} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route
                path="/admin"
                element={<ProtectedRoute element={<Admin />} />}
              />

              <Route
                path="/settings"
                element={<ProtectedRoute element={<Settings />} />}
              />

              <Route
                path="/*"
                element={<h1 className="text-xl font-bold">Not Found</h1>}
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
