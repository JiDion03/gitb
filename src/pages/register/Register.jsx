import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import Button from "../../components/button/Button";
import TextInput from "../../components/InputFields/TextInput/TextInput";
import './register.less';

const Register = () => {
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState(""); 
    const [success, setSuccess] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const register = async (e) => {
        e.preventDefault();
        const { password, confirmPassword } = user;

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            console.log('Registering user:', user);
            const response = await axios.post('http://localhost:5000/api/users', user);
            console.log('User created:', response.data);
            setSuccess('Registration successful! Please check your email to verify your account.');
            setError('');
        } catch (error) {
            console.error('Error creating user:', error);
            setError(error.response?.data?.message || 'Failed to register, please check your credentials and try again.');
            setSuccess('');
        }
    };
    
    return (
        <div className="register-container">
            <div className="register-heading">Create a new account</div>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
            <div className="register-form">
                <form autoComplete="off" onSubmit={register}>
                    <TextInput label="First Name" name="firstName" value={user.firstName} onChange={handleChange} />
                    <TextInput label="Last Name" name="lastName" value={user.lastName} onChange={handleChange} />
                    <TextInput label="Email" name="email" value={user.email} onChange={handleChange} />
                    <TextInput label="Phone Number" name="phoneNumber" value={user.phoneNumber} onChange={handleChange} />
                    <TextInput label="Password" name="password" type="password" value={user.password} onChange={handleChange} />
                    <TextInput label="Confirm Password" name="confirmPassword" type="password" value={user.confirmPassword} onChange={handleChange} />
                    <div className="button-container">
                        <Button type="submit">Register</Button>
                    </div>
                </form>
            </div>
            <div className="sign-in-link">
                Already have an account? <Link to="/login">Sign In</Link>
            </div>
        </div>
    );
}

export default Register;
