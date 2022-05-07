import React from "react";
import { Col, Row } from "react-bootstrap";
import { ImageData } from "../../../Store/ImageData";
import "./style.css";
function HistoryCard(props) {
  return (
    <>
      <Row className="history-card">
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
        <Col>
          <b>{props.qty} x</b>
        </Col>
      </Row>
    </>
  );
}

export default HistoryCard;
