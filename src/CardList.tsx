import React from "react";
import Card from "./Card";

interface Card {
  organization: string;
  availableFood: string;
  tags: string[];
  address: string;
  pax: number;
}

interface CardListProps {
  filteredCards: Card[];
}

const CardList: React.FC<CardListProps> = ({ filteredCards }) => {
  return (
    <div className="card-list-content">
      {filteredCards.length > 0 ? (
        <div className="card-list">
          {filteredCards.map((card, index) => (
            <Card
              key={index}
              organization={card.organization}
              availableFood={card.availableFood}
              tags={card.tags}
              address={card.address}
              pax={card.pax}
            />
          ))}
        </div>
      ) : (
        <p>No items match the selected tags.</p>
      )}
    </div>
  );
};

export default CardList;
