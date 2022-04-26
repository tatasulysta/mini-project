import React, { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return <div style={{ height: "100vh" }}>Home</div>;
}

export default Home;
