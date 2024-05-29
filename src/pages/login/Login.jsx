import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../components/button/Button";
import { useAuth } from "./AuthContext";
import { useNotification } from "../../components/notifications/NotificationContext";
import "./login.less";
import EmailInput from "../../components/InputFields/EmailInput/EmailInput";
import PasswordInput from "../../components/InputFields/PasswordInput/PasswordInput";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const showNotification = useNotification();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password }
      );
      console.log("Login successful:", response.data);

      // Accessing id instead of _id
      const userId = response.data.user.id;
      console.log("Fetched userId:", userId);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", userId);
      console.log("Stored userId:", localStorage.getItem("userId"));

      setAuth({
        isLoggedIn: true,
        user: response.data.user,
        token: response.data.token,
      });

      // Show success notification
      showNotification("Login successful!", "success");

      // Navigate based on user role
      if (response.data.user.role === "distributor") {
        navigate(`/products`);
      } else {
        navigate(`/profile/${userId}`);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Failed to login, please check your credentials and try again.");

      // Show error notification
      showNotification(
        "Failed to login, please check your credentials and try again.",
        "error"
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-heading">Login To Your Account</div>
      <div className="login-form">
        <form autoComplete="off" onSubmit={login}>
          <EmailInput value={user.email} handleChange={handleChange} />
          <PasswordInput value={user.password} handleChange={handleChange} />
          <div className="button-container">
            <Button type="submit">Login</Button>
          </div>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
      <div className="forgot-password-link">
        <Link to="/login/forgot_password">Forgot Your Password?</Link>
      </div>
      <div className="create-account-link">
        <span>You don't have an account?</span>
        <Link to="/account/register">Create One</Link>
      </div>
    </div>
  );
};

export default Login;
