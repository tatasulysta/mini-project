import React from "react";
import { ImSearch } from "react-icons/im";
import styles from "./styles.module.css";
function Search() {
  return (
    <>
      <form style={{ display: "inline-block", width: "90%" }}>
        <input
          type="text"
          name=""
          id=""
          placeholder="food name"
          className={styles.bar}
        />
        <button type="submit" className={styles.button}>
          <ImSearch />
        </button>
      </form>
    </>
  );
}
export default Search;
