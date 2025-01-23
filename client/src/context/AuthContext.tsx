import { createContext, useState, useEffect, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  setIsAuthenticated: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      const userInfo = await getUserInfo();
      if (userInfo) {
        setIsAuthenticated(true);
        setUser({ name: userInfo.userDetails, email: userInfo.userId });
      }
    })();
  }, []);

  async function getUserInfo() {
    try {
      const response = await fetch('/.auth/me');
      const payload = await response.json();
      const { clientPrincipal } = payload;
      return clientPrincipal;
    } catch (error) {
      console.error('No profile could be found');
      return undefined;
    }
  }

  const logout = () => {
    const redirect = window.location.origin;
    window.location.href = `/.auth/logout?post_logout_redirect_uri=${redirect}`;
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setIsAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
