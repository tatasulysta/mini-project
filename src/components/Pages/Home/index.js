import React, { useEffect, useState } from "react";
import Category from "../../Card/Category";
import MenuContainer from "../../MenuContainer/Index";
import { Row, Col, Container } from "react-bootstrap";
import {
  GETpizza,
  GETburger,
  GETdrink,
  GETsnack,
  GETmenuByName,
} from "../../../GraphQL/query";
import { GETcartID } from "../../../GraphQL/subscription";
import { Addcart, UpdateCart } from "../../../GraphQL/mutation";
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import SearchBar from "../../SearchBar/index";
import { Button } from "../../Button/index";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Lottie from "react-lottie";
import searching from "../../../lotties/searching.json";

function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);

  // Global state
  const counter = useSelector((state) => state.counter.value);

  //state & hooks
  const [select, setSelect] = useState("pizza");
  const [name, setName] = useState("");
  const [id, setID] = useState([]);
  const [list, setList] = useState([]);
  let navigate = useNavigate();

  // graphql
  const { data: resPizza, loading: loadPizza } = useQuery(GETpizza);
  const { data: resBurger, loading: loadBurger } = useQuery(GETburger);
  const { data: resDrink, loading: loadDrink } = useQuery(GETdrink);
  const { data: resSnack, loading: loadSnack } = useQuery(GETsnack);
  const { data: resCart } = useSubscription(GETcartID);

  const [fetchDatabyName, { data, loading }] = useLazyQuery(GETmenuByName, {
    notifyOnNetworkStatusChange: true,
  });
  const [addCart] = useMutation(Addcart);
  const [updateCart] = useMutation(UpdateCart);

  const handleClick = (what) => {
    setSelect(what);
    if (what === "burger") {
      setList(resBurger?.menu);
    }
    if (what === "pizza") {
      setList(resPizza?.menu);
    }
    if (what === "drink") {
      setList(resDrink?.menu);
    }
    if (what === "snack") {
      setList(resSnack?.menu);
    }
  };
  useEffect(() => {
    if (resPizza?.menu) {
      setList(resPizza?.menu);
    }
  }, [resPizza]);

  const handleSubmit = (inp) => {
    setSelect("");
    const _iregex = inp;
    const variables = { _iregex };
    fetchDatabyName({ variables });
    setName("");
  };

  useEffect(() => {
    data && setList(data?.menu);
  }, [data, name]);
  useEffect(() => {
    let temp = [];
    resCart?.Cart.map((i) => temp.push(i.id_menu));
    setID(temp);
  }, [resCart]);

  const handleAddcart = () => {
    let notIn = [];
    let inIT = [];
    counter.map((obj) => {
      if (!id.includes(obj.id)) {
        notIn.push(obj);
      } else {
        inIT.push(obj);
      }
    });
    notIn.shift();
    inIT.map((obj) => {
      return updateCart({
        variables: {
          _eq: obj.id,
          count: obj.count,
        },
      });
    });
    notIn.map((obj) => {
      return addCart({
        variables: {
          count: obj.count,
          id_menu: obj.id,
        },
      });
    });
    navigate("/cart");
    // dispatch(reset());
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: searching,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <>
      {loading ? (
        <Lottie
          options={defaultOptions}
          width={400}
          style={{ marginTop: "30vh" }}
        />
      ) : (
        <div
          style={{
            width: "100vw",
            height: "110vh",
            backgroundColor: "var(--background)",
          }}
        >
          <SearchBar
            setName={setName}
            name={name}
            handeleClick={handleSubmit}
          />
          <Container fluid>
            <Row>
              <Col xs={6} lg={3} md={3}>
                <div style={{ width: "fit-content", margin: "auto" }}>
                  <input
                    type="radio"
                    id="pizza"
                    defaultChecked={select === "pizza"}
                    value="pizza"
                    onClick={() => handleClick("pizza")}
                    style={{ display: "none" }}
                  />

                  <Category
                    title="Pizza"
                    styles={select === "pizza" ? "active" : "card-m"}
                    img={"assets/images/logo-menu/pizza.png"}
                  />
                </div>
              </Col>
              <Col xs={6} lg={3} md={3}>
                <div style={{ width: "fit-content", margin: "auto" }}>
                  <input
                    type="radio"
                    id="burger"
                    value="burger"
                    defaultChecked={select === "burger"}
                    onClick={() => handleClick("burger")}
                    style={{ display: "none" }}
                  />

                  <Category
                    title="Burger"
                    img={"assets/images/logo-menu/drink.png"}
                    styles={select === "burger" ? "active" : "card-m"}
                  />
                </div>
              </Col>
              <Col xs={6} lg={3} md={3}>
                <div style={{ width: "fit-content", margin: "auto" }}>
                  <input
                    type="radio"
                    id="snack"
                    value="snack"
                    defaultChecked={select === "snack"}
                    onClick={() => handleClick("snack")}
                    style={{ display: "none" }}
                  />

                  <Category
                    title="Snack"
                    img={"assets/images/logo-menu/fries.png"}
                    styles={select === "snack" ? "active" : "card-m"}
                  />
                </div>
              </Col>
              <Col xs={6} lg={3} md={3}>
                <div style={{ width: "fit-content", margin: "auto" }}>
                  <input
                    type="radio"
                    id="drink"
                    value="drink"
                    defaultChecked={select === "drink"}
                    onClick={() => handleClick("drink")}
                    style={{ display: "none" }}
                  />

                  <Category
                    title="Drink"
                    img={"assets/images/logo-menu/drink.png"}
                    styles={select === "drink" ? "active" : "card-m"}
                  />
                </div>
              </Col>
            </Row>
          </Container>
          <br />

          {!loadPizza && !loadBurger && !loadDrink && !loadSnack && (
            <MenuContainer data={list} />
          )}
          <Container>
            <div style={{ float: "right", marginTop: "20px", display: "flex" }}>
              <Button
                children="Add to cart"
                butStyle="primary"
                onClick={handleAddcart}
              />
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Home;
