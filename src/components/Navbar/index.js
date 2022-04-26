import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { BsCart2 } from "react-icons/bs";
import { VscHistory } from "react-icons/vsc";
import { Navbar, Container, NavbarBrand } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import style from "./style.module.css";

function Navibar() {
  return (
    <>
      <Navbar fixed="bottom" className={style.navbar}>
        <Container>
          <NavbarBrand>
            <NavLink
              to="/"
              style={({ isActive }) => {
                return {
                  color: isActive ? "white" : "var(--primary-color)",
                  backgroundColor: isActive ? "var(--primary-color)" : "",
                  padding: "0px 5px 8px",
                  borderRadius: "100px",
                };
              }}
            >
              <AiOutlineHome className={style.logo} />
            </NavLink>
          </NavbarBrand>
          <NavLink
            to="/cart"
            style={({ isActive }) => {
              return {
                color: isActive ? "white" : "var(--primary-color)",
                backgroundColor: isActive ? "var(--primary-color)" : "",
                padding: "2px 5px 5px",
                borderRadius: "100px",
              };
            }}
          >
            <BsCart2 className={style.logo} />
          </NavLink>

          <NavLink
            to="/history"
            style={({ isActive }) => {
              return {
                color: isActive ? "white" : "var(--primary-color)",
                backgroundColor: isActive ? "var(--primary-color)" : "",
                padding: "2px 5px 5px",
                borderRadius: "100px",
              };
            }}
          >
            <VscHistory className={style.logo} />
          </NavLink>
        </Container>
      </Navbar>
    </>
  );
}

export default Navibar;
