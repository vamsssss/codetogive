import React from "react";
import Card from "./Card";

interface Card {
  organization: string;
  availableFood: string;
  tags: string[];
}

interface CardListProps {
  filteredCards: Card[];
}

const CardList: React.FC<CardListProps> = ({ filteredCards }) => {
  return (
    <div className={"right"}>
      {filteredCards.length > 0 ? (
        filteredCards.map((card, index) => (
          <div className={"card-row"} key={index}>
            <Card
              organization={card.organization}
              availableFood={card.availableFood}
              tags={card.tags}
            />
          </div>
        ))
      ) : (
        <p>No items match the selected tags.</p>
      )}
    </div>
  );
};

export default CardList;
