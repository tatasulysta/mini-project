import React, { useEffect } from "react";
import Categories from "../../Categories";
import MenuCards from "../../MenuCards";
import MenuContainer from "../../MenuContainer/Index";
import Search from "../../SearchBar/Index";
function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "var(--background)",
      }}
    >
      <img
        src="assets/images/logo.png"
        alt=""
        style={{ width: "4%", display: "inline-block" }}
      />
      <Search />
      <br />
      <Categories />
      <br />

      <MenuContainer />
    </div>
  );
}

export default Home;
