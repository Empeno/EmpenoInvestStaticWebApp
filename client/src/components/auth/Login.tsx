import { useState, useContext } from 'react';

import { AuthContext } from '../../context/AuthContext';
import { FaGithub, FaMicrosoft, FaUser } from 'react-icons/fa';
import { FaKey } from 'react-icons/fa6';

interface LoginProps {
  setShowModal: (show: boolean) => void;
}

const Login = ({ setShowModal }: LoginProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const providers: { [key: string]: string } = {
    github: 'GitHub',
    aad: 'Microsoft',
  };

  const handleStandardLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/data-api/rest/Users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Failed to login');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setShowModal(false);
    } catch (err) {
      const errorMessage = (err as Error).message;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <form
        method="dialog"
        className="flex flex-col gap-5"
        onSubmit={handleStandardLogin}
      >
        <label
          htmlFor="username"
          className="input input-bordered flex items-center gap-2"
        >
          <FaUser className="opacity-50" />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            id="username"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label
          htmlFor="password"
          className="input input-bordered flex items-center gap-2"
        >
          <FaKey className="opacity-50" />
          <input
            type="password"
            className="grow"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <div className="text-xs text-error">{error}</div>}
        <div className="flex gap-7 ">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <span>Logging in...</span>
                <span className="loading loading-xs loading-spinner text-primary"></span>
              </div>
            ) : (
              'Login'
            )}
          </button>
          <button className="btn" onClick={() => setShowModal(false)}>
            Close
          </button>
        </div>
      </form>
      <div className="flex gap-5 w-full items-center">
        <hr className="border-base-200 border-2 w-full h-0 rounded-xl" />
        <span className="text-sm">Or</span>
        <hr className="border-base-200 border-2 w-full h-0 rounded-xl" />
      </div>
      <div className="flex flex-col gap-3">
        {!isAuthenticated &&
          Object.keys(providers).map((provider) => (
            <a
              className="btn btn-primary btn-outline flex items-center gap-2"
              key={provider}
              href={`/.auth/login/${provider}`}
            >
              {provider === 'aad' && <FaMicrosoft className="opacity-70" />}
              {provider === 'github' && <FaGithub className="opacity-70" />}
              Login with {providers[provider as keyof typeof providers]}
            </a>
          ))}
      </div>
    </div>
  );
};

export default Login;
