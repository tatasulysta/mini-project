import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button";
import style from "./styles.module.css";

function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar bg="light">
        <Container>
          <Navbar.Brand href="#home">
            <img src="assets/images/logo.png" alt="" className="logo" />
            <span className="brandname">&nbsp; Briskly</span>
          </Navbar.Brand>
          <Button
            children={"Login"}
            butSize={"small"}
            radius={"18px"}
            onClick={() => navigate("/login")}
          />
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
              <Button children={"Get Started"} radius="10px" />
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
      <Container id={style.how}>
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
    </>
  );
}

export default Home;
