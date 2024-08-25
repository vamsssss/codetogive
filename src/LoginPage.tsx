import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement your login logic here, e.g., call an API and get user info
    console.log("Logging in with", email, password);

    // Simulate a login response that includes the userType
    const loginResponse = {
      userType: email.includes("donor") ? "foodDonor" : "beneficiary", 
      // Example logic; this should be replaced with actual login response handling
    };

    // Redirect based on userType
    if (loginResponse.userType === "foodDonor") {
      navigate("/donor-input");
    } else if (loginResponse.userType === "beneficiary") {
      navigate("/beneficiaries"); // Assuming /beneficiaries is your main page for beneficiaries
    }
  };

  const handleRedirectToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="fullscreen-container">
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <div className="redirect-link">
          <p>
            Don't have an account?{" "}
            <a onClick={handleRedirectToRegister}>
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
