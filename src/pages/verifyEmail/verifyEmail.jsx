import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EmailVerify = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        console.log(`Attempting to verify email with userId: ${userId} and token: ${token}`);
        const url = `http://localhost:5000/api/users/verify/${userId}/${token}`;
        const response = await axios.post(url);
        console.log('Verification response:', response.data);
        navigate('/login', { replace: true });
      } catch (error) {
        console.error('Error verifying email:', error);
        navigate('/login', { replace: true });
      }
    };

    verifyEmail();
  }, [userId, token, navigate]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
};

export default EmailVerify;
