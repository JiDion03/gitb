import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./verifyEmail.less";

const EmailVerify = () => {
  const [message, setMessage] = useState("");
  const param = useParams();

  const handleVerify = async () => {
    try {
      const url = `http://localhost:5000/api/users/verify/${param.userId}/${param.token}`;
      const { data } = await axios.post(url); // Send POST request to verify user
      console.log(data);
      setMessage("Email verified successfully. You can now log in.");
    } catch (error) {
      console.log(error);
      setMessage("Verification failed. Invalid or expired link.");
    }
  };

  return (
    <div className="VerifyEmail-page">
      <div className="VerifyEmail">
        <h1>Verify Your Email</h1>
        <button className="verify-button" onClick={handleVerify}>Verify</button>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default EmailVerify;
