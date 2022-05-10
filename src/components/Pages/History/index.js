import React, { useEffect } from "react";
import Loading from "../../Loading";
import { useNavigate, useParams } from "react-router-dom";
import HistoryCard from "../../Card/HistoryCard";
import { GEThistories, GETtotal } from "../../../GraphQL/query";
import { useQuery } from "@apollo/client";
import InfoCard from "../../Card/InfoCard";
import { Button } from "../../Button";

function History(props) {
  let params = useParams();
  let priceIDR = Intl.NumberFormat("en-ID");
  const { data, loading } = useQuery(GEThistories, {
    variables: {
      _eq: params.historyId,
    },
  });
  const { data: total } = useQuery(GETtotal, {
    variables: {
      id: params.historyId,
    },
  });
  const navigate = useNavigate();
  const handleBack = (path) => {
    navigate(path);
  };
  useEffect(() => {}, [data]);
  if (loading) {
  }
  let order = params.historyId;
  order = order.substring(0, order.indexOf("-"));

  return (
    <div style={{ marginLeft: "10px" }}>
      <div className="head">
        <Button
          onClick={() => handleBack("/history")}
          children={"Back"}
          butStyle="secondary"
          butSize={"small"}
        />
        <h1
          style={{
            display: "inline-block",
            margin: 0,
            padding: 0,
          }}
        >
          History Details
        </h1>
      </div>
      <div className="content">
        <div className="id">
          <h3 style={{ color: "#535353", display: "inline-block" }}>
            Order ID
          </h3>
          <span style={{ fontSize: "15px", color: "#535353" }}>
            <b> #{order}</b>
          </span>
        </div>
        <div className="inside">
          {!loading &&
            data?.history_details.map((i) => {
              return (
                <HistoryCard
                  id={i.id_menu}
                  title={i.menu.title}
                  qty={i.qty}
                  price={priceIDR.format(i.menu.price * i.qty)}
                />
              );
            })}
        </div>
        <br />
        <div className="info-3">
          <InfoCard
            title="Subtotal"
            styling="primary"
            price={
              total?.history_label_by_pk.total -
              0.02 * total?.history_label_by_pk.total
            }
          />

          <InfoCard
            title="Services (2%)"
            styling="primary"
            price={0.02 * total?.history_label_by_pk.total}
          />
          <InfoCard title="Total" price={total?.history_label_by_pk.total} />
        </div>
      </div>
    </div>
  );
}

export default History;
