import React from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Button";

import "./style.css";
function HistoryLabel(props) {
  const uuid = props.id;
  let priceIDR = Intl.NumberFormat("en-ID");
  let order = props.date;
  order = order.substring(0, order.indexOf(","));
  let navigate = useNavigate();

  return (
    <Row className="label-card mx-3 mb-4" key={props.id}>
      <Col lg={5} xs={6} className="child-1">
        <Col>
          <img
            src="./assets/images/menu/3069343.png"
            alt="icons"
            className="label-img"
          />
        </Col>
        <Col className="label-date">Date : {order}</Col>
      </Col>
      <Col lg={7} xs={6} className="child-2">
        <Col>
          <Col className="label-id">
            <b>Order ID </b>
            <span style={{ fontSize: "13px" }}>{uuid.substring(0, 8)}</span>
          </Col>
          <Col>
            <b>Total :</b> Rp. {priceIDR.format(props.total)}
          </Col>
        </Col>
        <Col>
          <Button
            children={"View Details"}
            butSize={"small"}
            radius={"10px"}
            onClick={() => navigate(`/history/${props.id}`)}
          />
        </Col>
      </Col>
    </Row>
  );
}

export default HistoryLabel;
