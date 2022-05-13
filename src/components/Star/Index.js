import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function Star(props) {
  const { star } = props;
  let items = [];
  for (let i = 0; i < star; i++) {
    items.push(1);
  }
  for (let i = 0; i < 5 - star; i++) {
    items.push(0);
  }
  return (
    <div
      className={props.id}
      style={{ color: "var(--primary-color)", fontSize: "15px" }}
    >
      {items.map((i, index) => {
        if (i === 0) {
          return <AiOutlineStar key={` ${i}${i} ${index + 5}`} />;
        } else {
          return <AiFillStar key={` ${i}${i} ${index + 5}`} />;
        }
      })}
    </div>
  );
}

export default Star;
