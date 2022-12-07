/** @format */

import React from "react";
import "./Lost.css";
import FourOHFour from "./lost.png";
import spiral1 from "./spiral2.png";
import spiral2 from "./spiral2.png";

const Lost = () => {
  const Back = () => {
    window.location.replace("/Home");
  };
  return (
    <div className="lost">
      <div className="fourfour">
        <img src={FourOHFour} alt="none"></img>
        <div className="pagenotfound">Page not found!!!</div>
        <button className="backBtn" onClick={Back}>
          Go back
        </button>
      </div>
      <div className="spiral1">
        <img src={spiral1} alt="none"></img>
      </div>
      <div className="spiral2">
        <img src={spiral2} alt="none"></img>
      </div>
    </div>
  );
};
export default Lost;
