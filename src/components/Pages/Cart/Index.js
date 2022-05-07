import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CartCard from "../../Card/CartCard";
import { GETcart } from "../../../GraphQL/subscription";
import { useMutation, useSubscription } from "@apollo/client";
import InfoCard from "../../Card/InfoCard";
import { total } from "../../../Store/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import NotFound from "../NotFound";
import { Button } from "../../Button";
import { v4 as uuidv4 } from "uuid";
import loader from "../../../lotties/loader.json";
import {
  AddHistoryLabel,
  AddHistoryDetails,
  DeleteCart,
} from "../../../GraphQL/mutation";
import Lottie from "react-lottie";
function Cart() {
  const { data, loading } = useSubscription(GETcart);
  const [list, setList] = useState();
  const [addLabel] = useMutation(AddHistoryLabel);
  const [addHistory] = useMutation(AddHistoryDetails);
  const [deleteCart] = useMutation(DeleteCart);
  const [state, setState] = useState();
  const subtotal = useSelector((state) => state.counter.subtotal);
  const services = useSelector((state) => state.counter.services);
  const sum = useSelector((state) => state.counter.total);
  const dispatch = useDispatch();

  useEffect(() => {}, [loading]);
  useEffect(() => {}, [data]);
  useEffect(() => {}, [list]);
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
    // temp.toLocaleString()
    const uuid = uuidv4();
    const lists = list;
    addLabel({
      variables: {
        id: uuid,
        total: sum,
        create_at: temp.toLocaleString(),
      },
    });
    lists?.map((i) => {
      return addHistory({
        variables: {
          id_label: uuid,
          created_at: temp.toLocaleString(),
          qty: i.count,
          id_menu: i.menu.id,
        },
      });
    });
    deleteCart();
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loader,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      <Container style={{ width: "100vw" }}>
        <Container style={{ margin: "auto" }}>
          {loading ? (
            <Lottie options={defaultOptions} height={400} width={400} />
          ) : (
            <>
              {!loading && state ? (
                <h2>kosong</h2>
              ) : (
                <>
                  {" "}
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
                  <div style={{ float: "right" }}>
                    <br />
                    <InfoCard
                      title={"Subtotal"}
                      price={subtotal}
                      styling={"primary"}
                    />
                    <InfoCard
                      title={"Service (2%)"}
                      price={services}
                      styling={"primary"}
                    />
                    <InfoCard
                      title={"Total"}
                      price={sum}
                      styling={"secondary"}
                    />
                    <Button
                      children={"checkout"}
                      onClick={() => handleCheckout(sum, list)}
                    />
                  </div>
                  <div></div>
                </>
              )}
            </>
          )}
        </Container>
      </Container>
    </>
  );
}

export default Cart;
