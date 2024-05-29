import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './Notification.less';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Auto-close after 3 seconds
    return () => clearTimeout(timer); // Clear the timer if component unmounts
  }, [onClose]);

  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        {message}
      </div>
      <div className="notification-timer"></div>
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

Notification.defaultProps = {
  type: 'info'
};

export default Notification;
