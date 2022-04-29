import React from "react";
import { useLocation } from "react-router-dom";

const BankDetails = () => {
  const location = useLocation();
  const { address, bank_id, bank_name, branch, city, district, ifsc, state } =
    location.state;
  return (
    <div className="details">
      <div>
        <div>
          <b>Bank Name -</b>
          {bank_name}{" "}
        </div>
        <div>
          <b>Bank ID -</b>
          {bank_id}{" "}
        </div>
        <div>
          <b>Address -</b>
          {address}{" "}
        </div>
        <div>
          <b>Branch -</b>
          {branch}{" "}
        </div>
        <div>
          <b>City -</b>
          {city}{" "}
        </div>
        <div>
          <b> District -</b>
          {district}{" "}
        </div>
        <div>
          <b>IFSC -</b>
          {ifsc}{" "}
        </div>
        <div>
          <b>State -</b>
          {state}{" "}
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
