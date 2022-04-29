import React from "react";
import style from "./styles.module.css";
import { Col } from "react-bootstrap";
import Star from "../../Star/Index";
import { ImageData } from "../../../Store/ImageData";

function MenuCard(props) {
  return (
    <Col key={props.key}>
      <div className={style.container}>
        <div>
          {ImageData.map((u) => {
            if (u.id === props.id) {
              return <img src={u.img} alt="" className={style.img} />;
            }
            return false;
          })}
        </div>
        <div className={style.content}>
          <p style={{ margin: 0 }} className={style.text}>
            <b>{props.title}</b>
          </p>
          <Star star={props.star} />
          <p>{props.price}</p>
        </div>
      </div>
    </Col>
  );
}

export default MenuCard;
