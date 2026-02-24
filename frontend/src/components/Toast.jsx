import React from "react";

const Toast = ({ message, visible }) => {
  return (
    <div className={`toast ${visible ? "show" : ""}`} aria-live="polite">
      {message}
    </div>
  );
};

export default Toast;
