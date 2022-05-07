import React, { useEffect } from "react";
import HistoryLabel from "../../Card/HistoryLabel/Index";
import { GETlabel } from "../../../GraphQL/subscription";
import { useSubscription } from "@apollo/client";
import { useParams, Outlet } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
function Histories() {
  const { data, loading } = useSubscription(GETlabel);
  const params = useParams();
  useEffect(() => {
    document.title = "History";
  }, []);

  return (
    <div>
      {!params.historyId && (
        <>
          <h1>History</h1>
          <br />
          <Row className="my-2 mx-auto" style={{ width: "90%" }}>
            {!params.historyId && (
              <>
                {data?.history_label.map((i) => {
                  return (
                    <HistoryLabel
                      id={i.id}
                      date={i.create_at}
                      total={i.total}
                      key={i.id}
                    />
                  );
                })}
              </>
            )}
          </Row>
        </>
      )}
      <Outlet />
    </div>
  );
}

export default Histories;
