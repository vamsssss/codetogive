import "./Card.css";
import React, { useState, useEffect } from "react";

interface CardProps {
  organization: string;
  availableFood: string;
  tags: string[];
  address: string;
  pax: number;
}
const Card: React.FC<CardProps> = ({
  organization,
  availableFood,
  tags,
  address,
  pax,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleClick = () => {};
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);



  return (
    <div
      className={`card ${isHovered ? "card-hovered" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <p className="card-description">
        Organization: {organization} <br />
        Available Food: {availableFood} <br />
        Tags: {tags.join(", ")} <br />
        Address: {address} <br />
        Pax: {pax} <br />
      </p>
      {isHovered && <div className="card-hover-text">Click to contact</div>}
    </div>
  );
};
export default Card;
