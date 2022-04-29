import React from "react";
import "./styles.css";
import { NavLink } from "react-router-dom";
function Category(props) {
  const { title } = props;
  let temp = title.toLowerCase();

  return (
    <>
      <label htmlFor={temp}>
        <div className={props.styles}>
          <div className="content-m">
            <img src={props.img} alt="" className="logo" />

            <p className="navlink">{props.title}</p>
          </div>
        </div>
      </label>
    </>
  );
}

export default Category;
