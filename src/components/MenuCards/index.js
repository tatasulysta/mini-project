import MenuCard from "../Card/MenuCard";
import React from "react";
import { Container, Row } from "react-bootstrap";

function MenuCards() {
  return (
    <Container>
      <Row>
        <MenuCard />
        <MenuCard />
        <MenuCard />
        <MenuCard />
      </Row>
    </Container>
  );
}

export default MenuCards;
