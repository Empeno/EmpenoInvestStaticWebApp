import { useState, useContext } from "react";
import { HiMiniKey, HiMiniUser } from "react-icons/hi2";
import AxiosInstance from "../../utils/AxiosIntance";
import { AuthContext } from "../../context/AuthContext";

interface LoginProps {
  setShowModal: (show: boolean) => void;
}

const Login = ({ setShowModal }: LoginProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await AxiosInstance.post(`users/login/`, {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true); // Update the isAuthenticated state
      setLoading(false);
      setShowModal(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
      setLoading(false);
    }
  };

  return (
    <form method="dialog" className="flex flex-col gap-5" onSubmit={handleLogin}>
      <label htmlFor="username" className="input input-bordered flex items-center gap-2">
        <HiMiniUser size={20} />
        <input type="text" className="grow" placeholder="Username" id="username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label htmlFor="password" className="input input-bordered flex items-center gap-2">
        <HiMiniKey size={20} />
        <input type="password" className="grow" placeholder="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      {error && <div className="text-xs text-error">{error}</div>}
      <div className="flex gap-7">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-2">
              <span>Logging in...</span>
              <span className="loading loading-xs loading-spinner text-primary"></span>
            </div>
          ) : (
            "Login"
          )}
        </button>
        <button className="btn" onClick={() => setShowModal(false)}>
          Close
        </button>
      </div>
    </form>
  );
};

export default Login;
