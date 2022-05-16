import React from "react";
import Lottie from "react-lottie";
import noFace from "../../lotties/error.json";
import style from "./styles.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";

function NotFound() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: noFace,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found - Briskly</title>
      </Helmet>
      <div className={`${style.container} row`}>
        <div className="text col-lg-8 text-center my-auto">
          <h1
            style={{
              fontFamily: "Poppins,sans-serif",
              fontWeight: "700",
              fontSize: "100px",
            }}
          >
            Oops!
          </h1>
          <h5 style={{ fontFamily: "Source Sans Pro, sans-serif" }}>
            We can't seem to find the page you're looing for. Go back, or head
            over to{" "}
            <Link to="/" style={{ color: "#EF5353" }}>
              Home
            </Link>
          </h5>
        </div>
        <div className={`${style.image} col-lg-4  my-auto`}>
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      </div>
    </>
  );
}

export default NotFound;
