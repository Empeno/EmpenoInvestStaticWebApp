// import { useState } from "react";
// import { HiMiniKey, HiMiniUser, HiShieldCheck } from "react-icons/hi2";

const Register = () => {
  // const [username, setUsername] = useState<string>("");
  // const [password, setPassword] = useState<string>("");
  // const [confirmPassword, setConfirmPassword] = useState<string>("");
  // const [loading, setLoading] = useState<boolean>(false);
  // const [passwordsMatch, setPasswordsMatch] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState<string | null>(null);

  // const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (password !== confirmPassword) {
  //     setPasswordsMatch(false);
  //     setError("Passwords do not match");
  //     return;
  //   }

  //   setPasswordsMatch(true);
  //   setError(null);
  //   setLoading(true);

  //   try {
  //     await AxiosInstance.post(`users/register/`, {
  //       username,
  //       password,
  //     });

  //     setSuccess("Registration successful!");
  //     setUsername("");
  //     setPassword("");
  //     setConfirmPassword("");
  //     setLoading(false);
  //   } catch (err: any) {
  //     setError(err.response?.data?.message || "An error occurred. Please try again.");
  //   }
  // };

  return (
    <div className="w-full md:w-72">
      {/* <form method="dialog" className="flex flex-col gap-4" onSubmit={handleRegister}>
        <label htmlFor="username" className="input input-bordered flex items-center gap-2">
          <HiMiniUser size={20} />
          <input type="text" className="grow" placeholder="Username" id="username" autoComplete="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </label>

        <label htmlFor="password" className="input input-bordered flex items-center gap-2">
          <HiMiniKey size={20} />
          <input type="password" className="grow" placeholder="Password" id="password" value={password} autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <label htmlFor="confirmPassword" className="input input-bordered flex items-center gap-2">
          <HiShieldCheck size={20} />
          <input
            type="password"
            className="grow"
            placeholder="Confirm password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {!passwordsMatch && <div className="text-xs text-error">Passwords do not match</div>}
        {error && <div className="text-xs text-error">{error}</div>}
        {success && <div className="text-xs text-success">{success}</div>}
        <div className="mt-5 flex justify-between">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <span>Creating...</span>
                <span className="loading loading-xs loading-spinner text-primary"></span>
              </div>
            ) : (
              "Register"
            )}
          </button>
        </div>
      </form> */}
    </div>
  );
};

export default Register;
