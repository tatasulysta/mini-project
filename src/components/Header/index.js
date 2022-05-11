import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { ImSearch } from "react-icons/im";
import styles from "./styles.module.css";
import { NavDropdown, Nav } from "react-bootstrap";

import Cookies from "universal-cookie";
import { GETusername } from "../../GraphQL/subscription";
import { useSubscription } from "@apollo/client";
import { useNavigate } from "react-router-dom";
const cookies = new Cookies();

function Header(props) {
  const uid = cookies.get("loginID");
  const navigate = useNavigate();
  const [name, setName] = useState("user");
  const { data } = useSubscription(GETusername, {
    variables: { uid },
  });
  const [temp, setTemp] = useState("");
  const handleChange = (e) => {
    setTemp(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    props.handeleClick(temp);
    setTemp("");
  };
  const handleLogout = () => {
    cookies.remove("loginID");
    navigate("/");
  };
  useEffect(() => {
    if (data?.user[0].username !== undefined) {
      setName(data?.user[0].username);
    }
  }, [data]);

  return (
    <Navbar>
      <Container style={{ borderBottom: "1px solid var(--primary-color)" }}>
        <Navbar.Brand href="/">
          <img
            src="assets/images/logo.png"
            alt=""
            style={{ width: "40px", display: "inline-block" }}
          />
        </Navbar.Brand>
        <form style={{ width: "90%" }}>
          <input
            type="text"
            value={temp}
            onChange={handleChange}
            name=""
            id=""
            placeholder="food name"
            className={styles.bar}
          />
          <button
            type="submit"
            className={styles.button}
            onClick={(e) => handleClick(e)}
          >
            <ImSearch />
          </button>
        </form>
        <Nav>
          <NavDropdown title={`Hi,${name} `} id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => handleLogout()}>
              Logout
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
