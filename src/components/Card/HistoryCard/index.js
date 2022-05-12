import React from "react";
import { Col, Row } from "react-bootstrap";
import { ImageData } from "../../../utils/ImageData";
import "./style.css";
function HistoryCard(props) {
  return (
    <>
      <Row className="history-card mt-0 ml-0 mr-0 ">
        <Col className="child-1">
          {ImageData.map((u) => {
            if (u.id === props.id) {
              return (
                <img src={u.img} alt="" className="history-img" key={u.id} />
              );
            }
            return false;
          })}
        </Col>

        <Col className="child-2">
          <Col>{props.title}</Col>

          <br />
          <Col
            style={{
              color: "var(--accent-color)",
              fontFamily: "poppins, sans-serif  ",
            }}
          >
            <b>Rp. {props.price}</b>
          </Col>
        </Col>
        <Col className="pad-0">
          <b>Qty : {props.qty}</b>
        </Col>
      </Row>
    </>
  );
}

export default HistoryCard;
