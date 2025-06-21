import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate, replace } from "react-router-dom";
import "./index.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const navigate = useNavigate();

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" replace />;
  }

  const onSuccessLogin = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/", { replace: true });
  };

  const onFailureLogin = (errorMsg) => {
    setErrorMsg(errorMsg);
    setShowErrorMsg(true);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    let currentUsername = username;
    let currentPassword = password;
    if (currentUsername.toLowerCase().trim() === "lalit")
      currentUsername = "rahul";
    if (currentPassword === "lalit@123") currentPassword = "rahul@2021";

    const userDetails = {
      username: currentUsername,
      password: currentPassword,
    };
    const LoginApiUrl = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(LoginApiUrl, options);
      if (response.ok) {
        const data = await response.json();
        onSuccessLogin(data.jwt_token);
      } else {
        const errorData = await response.json();
        onFailureLogin(errorData.error_msg);
      }
    } catch (error) {
      onFailureLogin("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={onSubmitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo-login-form"
        />
        <div className="input-field-container">
          <label htmlFor="username" className="login-input-label">
            USERNAME
          </label>
          <input
            type="text"
            value={username}
            className="login-input-field"
            placeholder="lalit"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-field-container">
          <label htmlFor="password" className="login-input-label">
            PASSWORD
          </label>
          <input
            type="password"
            value={password}
            className="login-input-field"
            placeholder="lalit@123"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
        </div>
      </form>
    </div>
  );
};

export default Login;
