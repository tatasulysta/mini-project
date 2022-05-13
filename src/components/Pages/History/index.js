import React, { useEffect, useState } from "react";
import Loading from "../../Loading";
import { useNavigate, useParams } from "react-router-dom";
import HistoryCard from "../../Card/HistoryCard";
import { GEThistories, GETtotal } from "../../../GraphQL/query";
import { useQuery } from "@apollo/client";
import InfoCard from "../../Card/InfoCard";
import { Button } from "../../Button";
import Cookies from "universal-cookie";
import styles from "./styles.module.css";
import NotFound from "../NotFound";
import Helmet from "react-helmet";
const cookies = new Cookies();
function History() {
  let params = useParams();
  const uid = cookies.get("loginID");

  let priceIDR = Intl.NumberFormat("en-ID");
  const { data, loading } = useQuery(GEThistories, {
    variables: {
      _eq: params.historyId,
      uid: uid,
    },
  });
  const { data: label } = useQuery(GETtotal, {
    variables: {
      _eq: params.historyId,
      _eq1: uid,
    },
  });
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const handleBack = (path) => {
    navigate(path);
  };
  useEffect(() => {
    if (data?.history_details.length !== 0) {
      setTotal(label?.history_label[0].total);
    }
  }, [data, label]);
  if (loading) {
    <Loading />;
  }

  let order = params.historyId;
  order = order.substring(0, order.indexOf("-"));

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Briskly - History</title>
      </Helmet>
      {!loading && data?.history_details.length === 0 ? (
        <NotFound />
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className={styles.historyContainer}>
            <div className="id row">
              <div className="col-9">
                <h3 style={{ color: "#535353", display: "inline-block" }}>
                  Order
                </h3>
                <span style={{ fontSize: "15px", color: "#535353" }}>
                  <b> #{order}</b>
                </span>
              </div>
              <div className="col-3 justify-content-end">
                <Button
                  onClick={() => handleBack("/history")}
                  able={true}
                  children={"Back"}
                  butStyle="secondary"
                  butSize={"small"}
                  radius={"10px"}
                />
              </div>
              <p style={{ color: "#535353" }}>
                {data?.history_details[0].created_at}
              </p>
            </div>
            <div className="inside ">
              {!loading &&
                data?.history_details.map((i) => {
                  return (
                    <HistoryCard
                      key={i.id}
                      id={i.id_menu}
                      title={i.menu.title}
                      qty={i.qty}
                      price={priceIDR.format(i.menu.price * i.qty)}
                    />
                  );
                })}
            </div>
            <br />
            <div>
              <InfoCard
                title="Subtotal"
                styling="primary"
                price={total - 0.02 * total}
              />

              <InfoCard
                title="Services (2%)"
                styling="primary"
                price={0.02 * total}
              />
              <InfoCard title="Total" price={total} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default History;
