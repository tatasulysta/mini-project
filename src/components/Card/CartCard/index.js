import React, { useEffect, useState } from "react";
import { ImageData } from "../../../utils/ImageData";
import "./styles.css";
import { useSelector } from "react-redux";
import { useMutation, useSubscription } from "@apollo/client";
import { GETcartID } from "../../../GraphQL/subscription";
import { DeleteCartItems } from "../../../GraphQL/mutation";
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
      <div className=" col-lg-4  col-md-2 my-auto">
        <h5>{props.title}</h5>
        <p> Rp. {priceIDR.format(props.price)}</p>
      </div>
      <div className="col col-sm-11 col-lg-1 my-auto mx-auto" style={style}>
        <span className="quantity">Qty : </span>
        {props.count}
      </div>
      <div className=" col col-lg-1 col-sm-1 my-auto mx-auto">
        <AiFillCloseCircle
          fontSize={40}
          style={{ color: "var(--primary-color)" }}
          onClick={handleDelete}
        />
      </div>
      <div className=" col-lg-2 col-sm-12 my-auto  mx-auto" style={style}>
        <b>Rp. {priceIDR.format(props.price * props.count)}</b>
      </div>
    </div>
  );
}

const style = {
  fontSize: "19px",
};
export default CartCard;
