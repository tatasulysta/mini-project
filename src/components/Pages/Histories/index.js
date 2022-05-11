import React, { useEffect, useState } from "react";
import HistoryLabel from "../../Card/HistoryLabel/Index";
import { GETlabel } from "../../../GraphQL/subscription";
import { useSubscription } from "@apollo/client";
import { useParams, Outlet } from "react-router-dom";
import Loading from "../../Loading";
import { Row } from "react-bootstrap";
import NoItems from "../NoItems";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function Histories() {
  const uid = cookies.get("loginID");
  const { data, loading } = useSubscription(GETlabel, {
    variables: {
      uid,
    },
  });
  const [state, setState] = useState(false);

  const params = useParams();

  useEffect(() => {
    document.title = "History";
  }, []);
  useEffect(() => {
    let id = [];
    data?.history_label.map((i) => {
      return id.push(i.id_menu);
    });
    setState(id.length === 0);
  }, [data]);
  if (loading) {
    return <Loading />;
  }
  return (
    <div style={{ backgroundColor: "var(--background)" }} className="padd">
      {!loading && state ? (
        <NoItems title={"No transaction yet"} />
      ) : (
        <>
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
        </>
      )}
      <Outlet />
    </div>
  );
}

export default Histories;
