import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function Star(props) {
  const { star } = props;
  let items = [];
  for (let i = 0; i < star; i++) {
    items.push(<AiFillStar />);
  }
  for (let i = 0; i < 5 - star; i++) {
    items.push(<AiOutlineStar />);
  }
  return (
    <div style={{ color: "var(--primary-color)", fontSize: "15px" }}>
      {items}
    </div>
  );
}

export default Star;
