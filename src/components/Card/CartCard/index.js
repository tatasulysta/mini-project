import React, { useEffect, useState } from "react";
import { ImageData } from "../../../Store/ImageData";
import "./styles.css";
import { useSelector } from "react-redux";
import { useMutation, useSubscription } from "@apollo/client";
import { GETcartID } from "../../../GraphQL/subscription";
import { UpdateCart, DeleteCartItems } from "../../../GraphQL/mutation";
import { AiFillCloseCircle } from "react-icons/ai";

function CartCard(props) {
  const counter = useSelector((state) => state.counter.value);

  const { data: resCart } = useSubscription(GETcartID);

  const [updateCart] = useMutation(UpdateCart);
  const inIT = [];
  const [id, setID] = useState([]);
  const [count, setCount] = useState([]);
  const [deleteById] = useMutation(DeleteCartItems);

  useEffect(() => {
    let temp = [];
    let temp2 = [];
    resCart?.Cart.map((i) => temp.push(i.id_menu));
    resCart?.Cart.map((i) => temp2.push(i.count));
    setID(temp);
    setCount(temp2);
  }, [resCart]);

  const handleUpdate = () => {
    counter.map((obj) => {
      if (id.includes(obj.id)) {
        inIT.push(obj);
      }
    });

    inIT.map((obj, index) => {
      return updateCart({
        variables: {
          _eq: obj.id,
          count: +obj.count,
        },
      });
    });
  };
  const handleDelete = () => {
    deleteById({
      variables: {
        id_menu: props.id,
      },
    });
  };
  useEffect(() => {
    handleUpdate();
  }, [counter]);

  let priceIDR = Intl.NumberFormat("en-ID");

  return (
    <div
      className="row"
      key={props.id}
      style={{
        borderBottom: "1px solid black",
        marginTop: "10px",
      }}
    >
      <div className="col-lg-2 image-container my-auto">
        {ImageData.map((u) => {
          if (u.id === props.id) {
            return (
              <img
                src={u.img}
                className="image-cart"
                style={{ backgroundColor: "white" }}
                alt=""
                key={u.id}
              />
            );
          }
          return false;
        })}
      </div>
      <div className="col-lg-4 my-auto">
        <h5>{props.title}</h5>
        <p> Rp. {priceIDR.format(props.price)}</p>
      </div>
      <div className="col-lg-1 my-auto mx-auto" style={style}>
        {props.count}
      </div>
      <div className="col-lg-1 my-auto mx-auto">
        <AiFillCloseCircle
          fontSize={40}
          style={{ color: "var(--primary-color)" }}
          onClick={handleDelete}
        />
      </div>
      <div className="col-lg-2  my-auto  mx-auto" style={style}>
        Rp. {priceIDR.format(props.price * props.count)}
      </div>
    </div>
  );
}

const style = {
  fontSize: "19px",
};
export default CartCard;
