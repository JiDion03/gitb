import React from "react";
import './UserNameInput.less';

const UsernameInput = ({ value, handleChange }) => {
    return (
        <div className="input-field">
            <input type="text" name="username" value={value} onChange={handleChange} placeholder="Your username" />
        </div>
    );
}

export default UsernameInput;
