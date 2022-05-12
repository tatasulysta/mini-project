import React, { useEffect, useState } from "react";
import { ImageData } from "../../../utils/ImageData";
import "./styles.css";
import { useSelector } from "react-redux";
import { useMutation, useSubscription } from "@apollo/client";
import { GETcartID } from "../../../GraphQL/subscription";
import { DeleteCartItems } from "../../../GraphQL/mutation";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillCloseCircle } from "react-icons/ai";
import Cookies from "universal-cookie";
const cookies = new Cookies();
function CartCard(props) {
  const counter = useSelector((state) => state.counter.value);
  const uid = cookies.get("loginID");
  const { data: resCart } = useSubscription(GETcartID);

  const [id, setID] = useState([]);
  const [deleteById] = useMutation(DeleteCartItems);

  useEffect(() => {
    let temp = [];
    let temp2 = [];
    resCart?.Cart.map((i) => temp.push(i.id_menu));
    resCart?.Cart.map((i) => temp2.push(i.count));
    setID(temp);
  }, [resCart]);
  const handleDelete = () => {
    deleteById({
      variables: {
        id_menu: props.id,
        uid,
      },
    });
  };

  let priceIDR = Intl.NumberFormat("en-ID");

  return (
    <Container key={props.id} className="cart-card">
      <Row>
        <Col xs={3} md={2} lg={2} sm={2} className="mx-auto">
          {ImageData.map((u) => {
            if (u.id === props.id) {
              return (
                <img
                  src={u.img}
                  className="img-fluid"
                  style={{ backgroundColor: "white" }}
                  alt=""
                  key={u.id}
                />
              );
            }
            return false;
          })}
        </Col>
        <Col xs={6} md={3} lg={3} sm={3} className=" mx-auto my-auto  ">
          <Col xs={12}>
            <h5>{props.title}</h5>
            <p> Rp. {priceIDR.format(props.price)}</p>
          </Col>
          <Col
            xs={12}
            style={{ padding: "0px", margin: "0px " }}
            className="quantity "
          >
            <span>Qty : </span>
            {props.count}
          </Col>
          <Col xs={12} className="quantity ">
            <span>Total : </span>
            Rp. {priceIDR.format(props.price * props.count)}
          </Col>
        </Col>
        <Col
          lg={2}
          md={2}
          sm={2}
          style={{ padding: "0px", margin: "0px " }}
          className="close my-auto  mx-auto    "
        >
          {props.count}
        </Col>

        <Col className="my-auto   mx-auto close " sm={2} md={2} lg={2}>
          {/* <span className="quantity">Total : </span> */}
          Rp. {priceIDR.format(props.price * props.count)}
        </Col>
        <Col xs={2} md={2} sm={2} className=" my-auto  mx-auto  ">
          <AiFillCloseCircle
            fontSize={40}
            onClick={handleDelete}
            className="delete"
          />
        </Col>
      </Row>
    </Container>
  );
}

export default CartCard;
