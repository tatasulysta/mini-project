import React from "react";
import "./styles.css";
const styles = ["primary", "secondary"];
const size = ["medium", "small"];
export const Button = ({ children, onClick, butStyle, butSize, radius }) => {
  const checkStyle = styles.includes(butStyle) ? butStyle : styles[0];
  const checkSize = size.includes(butSize) ? butSize : size[0];
  return (
    <button
      className={`btn ${checkSize} ${checkStyle} `}
      style={{ borderRadius: radius }}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
