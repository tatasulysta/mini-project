import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

function MainNav(props) {
  const navigate = useNavigate();
  const title = props.title;
  return (
    <Navbar bg="light">
      <Container>
        <Navbar.Brand
          onClick={() => {
            navigate("/");
          }}
          className="brand"
        >
          <img src="assets/images/logo.png" alt="" className="logo" />
          <span className="brandname">&nbsp; Briskly</span>
        </Navbar.Brand>
        <div className="justify-content-end">
          <Button
            children={title}
            butSize={"small"}
            butStyle={props.styles}
            radius={"10px"}
            able={true}
            onClick={() => navigate(`/${title}`)}
          />
        </div>
      </Container>
    </Navbar>
  );
}

export default MainNav;
