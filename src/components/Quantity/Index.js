import style from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { add, increment, decrement } from "../../Store/counterSlice";
import { useSelector, useDispatch } from "react-redux";
import { offsetLimitPagination } from "@apollo/client/utilities";

function Quantity(props) {
  const counter = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const handleIncre = () => {
    setCount(count + 1);
    let flag = false;
    counter.filter((item) => {
      if (item.id === props.id) {
        dispatch(increment(props.id));
        return (flag = true);
      }
      return flag;
    });
    if (flag === false) {
      let temp = {
        id: props.id,
        count: count + 1,
      };
      dispatch(add(temp));
    }
  };
  const handleDecre = () => {
    if (count !== 0) {
      setCount(count - 1);
    }
    dispatch(decrement(props.id));
  };
  useEffect(() => {
    if (count === 0) {
      let flag = false;
      let temp = 0;
      counter.filter((item) => {
        if (item.id === props.id) {
          temp = item.count;
          return (flag = true);
        }
        return flag;
      });
      if (true) {
        setCount(temp);
      }
    }
  });
  return (
    <>
      <div className={style.wrapper}>
        <button
          className={count !== 0 ? style.decre : style.decre2}
          onClick={handleDecre}
        >
          -
        </button>
        <span>{count}</span>
        <button className={style.incre} onClick={handleIncre}>
          +
        </button>
      </div>
      <br />
    </>
  );
}

export default Quantity;
