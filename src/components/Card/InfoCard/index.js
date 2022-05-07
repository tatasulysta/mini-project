import React, { useEffect } from "react";

function InfoCard(props) {
  let priceIDR = Intl.NumberFormat("en-ID");

  return (
    <>
      {props.styling === "primary" ? (
        <div style={primary}>
          <b>{props.title}</b> : Rp. {priceIDR.format(props.price)}
        </div>
      ) : (
        <div style={secondary}>
          <b>{props.title}</b> : Rp. {priceIDR.format(props.price)}
        </div>
      )}
    </>
  );
}
const primary = {
  border: "1px solid black",
  display: "inline-block",
  padding: "15px 20px",
};
const secondary = {
  border: "1px solid black",
  display: "inline-block",
  padding: "15px 20px",
  backgroundColor: "black",
  color: "white",
};
export default InfoCard;
