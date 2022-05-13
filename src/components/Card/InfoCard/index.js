import React from "react";

function InfoCard(props) {
  let priceIDR = Intl.NumberFormat("en-ID");

  return (
    <>
      <div className="col">
        <b>{props.title}</b> : Rp. {priceIDR.format(props.price)}
      </div>
    </>
  );
}

export default InfoCard;
