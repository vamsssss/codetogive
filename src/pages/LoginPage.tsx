import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userType, setUserType] = useState<string>(""); // State for user type selection
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Logging in with", email, password, "as", userType);

    // Redirect based on selected userType
    if (userType === "donor") {
      navigate("/donate");
    } else if (userType === "beneficiary") {
      navigate("/beneficiaries");
    }
  };

  const handleRedirectToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-fullscreen-container">
      <div className="login-box">
        <h2 className="login-h2">Login</h2>
        <form className="login-form-group" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>
          <div>
            <label htmlFor="userType">Login as</label>
            <select
              id="userType"
              value={userType}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setUserType(e.target.value)
              }
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="donor">Food Donor/Restaurant Establishment</option>
              <option value="beneficiary">Beneficiary</option>
            </select>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="redirect-link">
          <p>
            Don't have an account?{" "}
            <a onClick={handleRedirectToRegister} role="button" style={{cursor: 'pointer'}}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
