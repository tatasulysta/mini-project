import React, { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import { ImSearch } from "react-icons/im";
import styles from "./styles.module.css";

function Search(props) {
  const [temp, setTemp] = useState("");
  const handleChange = (e) => {
    setTemp(e.target.value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    props.handeleClick(temp);
    setTemp("");
  };

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
      </Container>
    </Navbar>
  );
}
export default Search;
