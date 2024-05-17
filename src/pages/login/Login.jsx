import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Button from "../../components/button/Button";
import { useAuth } from './AuthContext'; 
import './login.less';
import EmailInput from "../../components/InputFields/EmailInput/EmailInput";
import PasswordInput from "../../components/InputFields/PasswordInput/PasswordInput";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
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
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      console.log('Login successful:', response.data);
      setAuth({ isLoggedIn: true, user: response.data.user, token: response.data.token });
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Failed to login, please check your credentials and try again.');
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
}

export default Login;
