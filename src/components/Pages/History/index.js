import React, { useEffect } from "react";

function History() {
  useEffect(() => {
    document.title = "History";
  }, []);
  return (
    <div>
      History
      <h2>hi</h2>
    </div>
  );
}

export default History;
