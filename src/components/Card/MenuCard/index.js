import React, { useEffect, useState } from "react";
import style from "./styles.module.css";
import { Col } from "react-bootstrap";
import Star from "../../Star/Index";
import { ImageData } from "../../../utils/ImageData";
import Quantity from "../../Quantity/Index";
function MenuCard(props) {
  let priceIDR = Intl.NumberFormat("en-ID");

  return (
    <Col key={props.id}>
      <div className={style.container}>
        <div style={{ backgroundColor: "white" }}>
          {ImageData.map((u) => {
            if (u.id === props.id) {
              return (
                <img src={u.img} alt="" className={style.img} key={u.id} />
              );
            }
            return false;
          })}
        </div>
        <div className={style.content}>
          <p style={{ margin: 0 }} className={style.text}>
            <b>{props.title}</b>
          </p>
          <Star star={props.star} id={props.id} />
          <p>Rp. {priceIDR.format(props.price)}</p>
          <Quantity id={props.id} />
        </div>
      </div>
    </Col>
  );
}

export default MenuCard;
