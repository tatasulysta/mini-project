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
    <Navbar style={{ backgroundColor: "white", marginBottom: "10px" }}>
      <Container>
        <Navbar.Brand href="/">
          <img
            src="assets/images/logo.png"
            alt=""
            style={{ width: "40px", display: "inline-block" }}
          />
          <span className="brandname">&nbsp; Briskly</span>
        </Navbar.Brand>

        <form className="d-flex">
          <input
            type="text"
            value={temp}
            onChange={handleChange}
            name=""
            id=""
            placeholder="Search"
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
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
export default Header;
