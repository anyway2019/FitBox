import React from "react";
import "./Row.scss";

const Row = ({ children, ...props }) => {
  return (
    <>
      <div className="rowContainer">{children}</div>
    </>
  );
};
export default Row;
