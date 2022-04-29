import React, { useEffect, useState } from "react";
import Category from "../Card/Category";
import MenuContainer from "../MenuContainer/Index";
import { Row, Col, Container } from "react-bootstrap";
import { GETpizza, GETburger, GETdrink, GETsnack } from "../../GraphQL/query";
import { useQuery } from "@apollo/client";
import { buildQueryFromSelectionSet } from "@apollo/client/utilities";

function Categories() {
  const [select, setSelect] = useState("pizza");
  const { data: resPizza, loading: loadPizza } = useQuery(GETpizza);
  const { data: resBurger, loading: loadBurger } = useQuery(GETburger);
  const { data: resDrink, loading: loaDrink } = useQuery(GETdrink);
  const { data: resSnack, loading: loadSnack } = useQuery(GETsnack);

  const [list, setList] = useState([]);
  const handleClick = (what) => {
    setSelect(what);
    if (what === "burger") {
      setList(resBurger?.menu);
    }
    if (what === "pizza") {
      setList(resPizza?.menu);
    }
    if (what === "drink") {
      setList(resDrink?.menu);
    }
    if (what === "snack") {
      setList(resSnack?.menu);
    }
  };
  useEffect(() => {
    if (resPizza?.menu) {
      setList(resPizza?.menu);
    }
  }, [resPizza]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={6} lg={3} md={3}>
            <div style={{ width: "fit-content", margin: "auto" }}>
              <input
                type="radio"
                id="pizza"
                defaultChecked={select === "pizza"}
                value="pizza"
                onClick={() => handleClick("pizza")}
                style={{ display: "none" }}
              />

              <Category
                title="Pizza"
                styles={select === "pizza" ? "active" : "card-m"}
                img={"assets/images/logo-menu/pizza.png"}
              />
            </div>
          </Col>
          <Col xs={6} lg={3} md={3}>
            <div style={{ width: "fit-content", margin: "auto" }}>
              <input
                type="radio"
                id="burger"
                value="burger"
                defaultChecked={select === "burger"}
                onClick={() => handleClick("burger")}
                style={{ display: "none" }}
              />

              <Category
                title="Burger"
                img={"assets/images/logo-menu/drink.png"}
                styles={select === "burger" ? "active" : "card-m"}
              />
            </div>
          </Col>
          <Col xs={6} lg={3} md={3}>
            <div style={{ width: "fit-content", margin: "auto" }}>
              <input
                type="radio"
                id="snack"
                value="snack"
                defaultChecked={select === "snack"}
                onClick={() => handleClick("snack")}
                style={{ display: "none" }}
              />

              <Category
                title="Snack"
                img={"assets/images/logo-menu/fries.png"}
                styles={select === "snack" ? "active" : "card-m"}
              />
            </div>
          </Col>
          <Col xs={6} lg={3} md={3}>
            <div style={{ width: "fit-content", margin: "auto" }}>
              <input
                type="radio"
                id="drink"
                value="drink"
                defaultChecked={select === "drink"}
                onClick={() => handleClick("drink")}
                style={{ display: "none" }}
              />

              <Category
                title="Drink"
                img={"assets/images/logo-menu/drink.png"}
                styles={select === "drink" ? "active" : "card-m"}
              />
            </div>
          </Col>
        </Row>
      </Container>
      <br />
      {!loadPizza && !loadBurger && !loadSnack && !loadSnack && (
        <MenuContainer data={list} />
      )}
    </>
  );
}

export default Categories;
