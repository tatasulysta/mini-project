import React, { useEffect, useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import style from "./styles.module.css";
import { GETmenu } from "../../GraphQL/query";
import MenuContainer from "../../components/MenuContainer/Index";
import { useQuery } from "@apollo/client";
import Helmet from "react-helmet";
function Home() {
  const navigate = useNavigate();
  const [list, setList] = useState();

  const { data } = useQuery(GETmenu);
  useEffect(() => {
    setList(data?.menu);
  }, [data?.menu]);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Briskly</title>
      </Helmet>
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
          <Nav className="justify-content-end flex-grow-1 pe-3">
            <a href="#menu" className="links">
              Menu
            </a>
            &nbsp; &nbsp;
            <a href="#how" className="links">
              How it Works
            </a>
          </Nav>
          <Nav>
            <Button
              children={"Login"}
              butSize={"small"}
              radius={"10px"}
              able={true}
              onClick={() => navigate("/login")}
            />
            &nbsp;&nbsp;
            <Button
              children={"Register"}
              butSize={"small"}
              butStyle={"secondary"}
              radius={"10px"}
              able={true}
              onClick={() => navigate("/register")}
            />
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <div className="row mt-5">
          <div className="col-lg-6 col-md-6 col-sm-6 ">
            <div className="col-lg-7 my-auto">
              <h1 className={style.title}>
                The Fastest Fast Food Restaurant in
                <span style={{ color: "var(--primary-color)" }}>
                  {" "}
                  Your City
                </span>
              </h1>
              <br />
              <p className={style.caption}>
                With Briskly web application you can order food pick up without
                waiting at the restaurant
              </p>
              <Button
                children={"Get Started"}
                radius="10px"
                able={true}
                onClick={() => navigate("/login")}
              />
            </div>
          </div>
          <div className="col justify-content-end k">
            <img
              src="./assets/images/landingPage/background.png"
              alt=""
              srcset=""
              className="img-fluid"
            />
          </div>
        </div>
      </Container>
      <section id="menu" className={style.menu}>
        <div className={`justify-content-center ${style.secondPage} mx-auto`}>
          <h3 className={style.title}>
            Explore <span style={{ color: "var(--primary-color)" }}>Menu</span>
          </h3>{" "}
          <br />
          <MenuContainer data={list} show={false} styles={"bg-no"} />
        </div>
      </section>
      <Container className={style.how} id="how">
        <div className={`justify-content-center ${style.secondPage} mx-auto`}>
          <h2 className={style.title} style={{ color: "var(--primary-color)" }}>
            How It Works
          </h2>
          <p>Order anywhere,anytime</p>
          <br />
          <div className="row">
            <div className="col-lg-6">
              <img
                src="./assets/images/landingPage/register.png"
                alt=""
                srcset=""
                className="img-fluid"
              />
            </div>
            <div className="col-lg-6">
              <img
                src="./assets/images/landingPage/exclamationMark.png"
                alt=""
                style={{ width: "50px" }}
              />
              <h4>Register your Account</h4>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-lg-6">
              <img
                src="./assets/images/landingPage/menu.png"
                alt=""
                style={{ width: "60px" }}
              />
              <h4>Add dishes to your Cart</h4>
            </div>
            <div className="col-lg-6">
              <img
                src="./assets/images/landingPage/cart.png"
                alt=""
                srcset=""
                className="img-fluid"
              />
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-lg-6">
              <img
                src="./assets/images/landingPage/payment.png"
                alt=""
                srcset=""
                className="img-fluid"
              />
            </div>
            <div className="col-lg-6">
              <img
                src="./assets/images/landingPage/pay.png"
                alt=""
                style={{ width: "50px" }}
              />
              <h4>Make your payment</h4>
            </div>
          </div>
          <br />
          <br />
          <div className="row">
            <div className="col-lg-6" style={{ textAlign: "justify" }}>
              <br />
              <p>
                Now, you can seat back and relax. Briskly restaurant will
                prepare food that you ordered and can be pick up arround
                estimated time 10-15 minutes.
              </p>
              <p>
                <span
                  style={{ color: "var(--primary-color)", fontWeight: "bold" }}
                >
                  {" "}
                  Easy Pick Up!
                </span>{" "}
                you can show your history ID to cashier to pick up your food and
                ENJOY IT!
              </p>
            </div>

            <div className="col-lg-6">
              <img
                src="./assets/images/landingPage/wait.png"
                alt=""
                srcset=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </Container>
      <footer className=" f-primary text-center text-lg-start">
        <div className="text-center p-3">
          © 2022 Copyright
          <span>
            &nbsp; <b>Briskly</b>
          </span>
        </div>
      </footer>
    </>
  );
}

export default Home;
