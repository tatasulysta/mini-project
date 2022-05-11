import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CartCard from "../../Card/CartCard";
import { GETcart } from "../../../GraphQL/subscription";
import { useMutation, useSubscription } from "@apollo/client";
import InfoCard from "../../Card/InfoCard";
import { total } from "../../../features/counterSlice";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "../../Button";
import { v4 as uuidv4 } from "uuid";
import {
  AddHistoryLabel,
  AddHistoryDetails,
  DeleteCart,
} from "../../../GraphQL/mutation";
import Loading from "../../Loading";
import NoItems from "../NoItems";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
function Cart() {
  const uid = cookies.get("loginID");
  const { data, loading } = useSubscription(GETcart, {
    variables: {
      uid: uid,
    },
  });

  const [list, setList] = useState();
  const [addLabel] = useMutation(AddHistoryLabel);
  const [addHistory] = useMutation(AddHistoryDetails);
  const [deleteCart] = useMutation(DeleteCart);
  const [state, setState] = useState();
  const subtotal = useSelector((state) => state.counter.subtotal);
  const services = useSelector((state) => state.counter.services);
  const sum = useSelector((state) => state.counter.total);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {}, [loading]);
  useEffect(() => {}, [data]);

  useEffect(() => {
    setList(data?.Cart);
    let id = [];
    data?.Cart.map((i) => {
      return id.push(i.id_menu);
    });
    setState(id.length === 0);
  }, [data]);

  useEffect(() => {
    let price = 0;
    list?.map((i) => {
      let temp = i.count * i.menu.price;
      return (price += temp);
    });
    dispatch(total(price));
  }, [list, dispatch]);
  const handleCheckout = (sum, list) => {
    const temp = new Date();

    const uuid = uuidv4();
    const lists = list;
    addLabel({
      variables: {
        id: uuid,
        total: sum,
        create_at: temp.toLocaleString(),
        uid,
      },
    });
    lists?.map((i) => {
      return addHistory({
        variables: {
          id_label: uuid,
          created_at: temp.toLocaleString(),
          qty: i.count,
          id_menu: i.menu.id,
          uid,
        },
      });
    });
    deleteCart({
      variables: {
        uid: uid,
      },
    });
    navigate("/history");
  };

  return (
    <div className="padd">
      <Container
        style={{ width: "100vw", paddingBottom: "150px", minHeight: "100vh" }}
      >
        <Container style={{ margin: "auto" }}>
          {loading ? (
            <Loading />
          ) : (
            <>
              {!loading && state ? (
                <NoItems title={"Cart is Empty!"} />
              ) : (
                <>
                  <Row
                    style={{
                      borderBottom: "1.5px solid black",
                      paddingBottom: "10px",
                      paddingTop: "15px",
                      fontFamily: "poppins, sans-serif",
                      marginBottom: "20px",
                    }}
                  >
                    <Col lg={2}></Col>
                    <Col lg={4}>Item</Col>
                    <Col lg={1} className="mx-auto">
                      Quantity
                    </Col>
                    <Col lg={1} className="mx-auto">
                      Delete
                    </Col>
                    <Col lg={2} className="mx-auto">
                      Price
                    </Col>
                  </Row>
                  {list?.map((i) => {
                    return (
                      <CartCard
                        id={i.id_menu}
                        count={i.count}
                        price={i.menu.price}
                        title={i.menu.title}
                      />
                    );
                  })}
                  <div className="info">
                    <div>
                      <br />
                      <InfoCard
                        title={"Subtotal"}
                        price={subtotal}
                        styling={"primary"}
                      />
                      &nbsp;
                      <InfoCard
                        title={"Service (2%)"}
                        price={services}
                        styling={"primary"}
                      />
                      &nbsp;
                      <InfoCard
                        title={"Total"}
                        price={sum}
                        styling={"secondary"}
                      />
                    </div>
                    <div className="info-2">
                      <Button
                        children={"Continue Shopping"}
                        butStyle={"secondary"}
                        onClick={() => navigate("/menu")}
                      />
                      &nbsp;
                      <Button
                        children={"Checkout"}
                        butSize={"medium"}
                        onClick={() => handleCheckout(sum, list)}
                      />
                      &nbsp;
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </Container>
      </Container>
    </div>
  );
}

export default Cart;
