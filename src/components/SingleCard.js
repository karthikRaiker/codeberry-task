import React from "react";
import "./styles.css";

const SingleCard = ({ item }) => {
  return (
    <div className="Card">
      <div className="Name">Name: {item.name}</div>
      <div className="Name">Email: {item.email}</div>
      <div className="Name">Company Name: {item.company.name}</div>
      {item.dob && <div className="Name">Date of Birth: {item.dob}</div>}
    </div>
  );
};

export default SingleCard;
