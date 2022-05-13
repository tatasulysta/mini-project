import React from "react";
import "./styles.css";
const styles = ["primary", "secondary"];
const size = ["medium", "small", "card"];
export const Button = ({
  children,
  onClick,
  butStyle,
  butSize,
  radius,
  type,
  able,
}) => {
  const checkStyle = styles.includes(butStyle) ? butStyle : styles[0];
  const checkSize = size.includes(butSize) ? butSize : size[0];
  if (!able) {
    return (
      <button
        className={`btns ${checkSize} ${checkStyle} btn-disable`}
        style={{ borderRadius: radius }}
        type={type}
        disabled
      >
        {children}
      </button>
    );
  } else {
    return (
      <button
        className={`btns ${checkSize} ${checkStyle} `}
        style={{ borderRadius: radius }}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  }
};
