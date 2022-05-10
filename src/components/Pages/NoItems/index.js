import React from "react";
import zero from "../../../lotties/zero.json";
import Lottie from "react-lottie";
import style from "./style.module.css";
import { Button } from "../../Button";
import { useNavigate } from "react-router-dom";
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: zero,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function NoItems(props) {
  const navigate = useNavigate();
  return (
    <div className={style.container}>
      <Lottie options={defaultOptions} width={400} />
      <p className={style.head}>{props.title}</p>
      <div className="d-flex justify-content-center">
        <Button
          children={"Continue Shopping"}
          butStyle={"secondary"}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}

export default NoItems;
