import React, { useEffect, useState } from "react";
import Category from "../Card/Category";
import MenuCards from "../MenuCards";
import { Row, Col, Container } from "react-bootstrap";

function Categories() {
  const [select, setSelect] = useState("pizza");

  const handleClick = (what) => {
    setSelect(what);
  };

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
    </>
  );
}

export default Categories;
