import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import Categories from "../../Categories";
import MenuCards from "../../MenuCards";
import MenuContainer from "../../MenuContainer/Index";
import Search from "../../SearchBar/Index";
import { GETall, GETmenu } from "../../../GraphQL/query";
function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  const [fetchDatabyID, { data, loading }] = useLazyQuery(GETmenu);
  const { data: respond, loading: isLoad } = useQuery(GETall);
  const [list, setList] = useState([]);
  const [uid, setUID] = useState("");
  const [done, setDone] = useState(false);
  const handleChange = (e) => {
    if (e.target) {
      setUID(e.target.value);
    }
  };
  const searchbyID = () => {
    console.log(uid);
    if (uid === "") {
      alert("Masukkan id");
      setDone(false);
    } else {
      fetchDatabyID({
        variables: {
          id: uid,
        },
      });
      setUID("");
      setDone(true);
    }
  };
  useEffect(() => {
    setList(respond?.list_pengunjung);
  }, [respond]);

  useEffect(() => {
    setList(data?.list_pengunjung);
  }, [data]);
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
      <input
        type="number"
        value={uid}
        placeholder="Masukkan id pengunjung "
        onChange={handleChange}
      />
      <button onClick={searchbyID}>Cari </button>
      {isLoad || loading ? <h1>loading</h1> : <MenuContainer data={list} />}
    </div>
  );
}

export default Home;
