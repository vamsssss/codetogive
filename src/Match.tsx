import React, { useState, useEffect } from "react";
import Card from "./Card";

interface Card {
  organization: string;
  availableFood: string;
  tags: string[];
  address: string;
  pax: number;
}

const Match: React.FC = () => {
  const [highestPriorityCard, setHighestPriorityCard] = useState<Card | null>(null);
  const [cardData, setCardData] = useState<Card[]>([]);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/listings");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCardData(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  useEffect(() => {
    const findHighestPriorityCard = () => {
      const sortedCards = [...cardData].sort((a, b) => {
        // Sort by pax first
        if (b.pax !== a.pax) {
          return b.pax - a.pax;
        }
        // If pax is the same, sort by the number of tags
        return b.tags.length - a.tags.length;
      });

      // The first card in the sorted array is the one with the highest priority
      setHighestPriorityCard(sortedCards[0] || null);
    };

    if (cardData.length > 0) {
      findHighestPriorityCard();
    }
  }, [cardData]);

  return (
    <div className="overall-box">
      <h1>Matched Listing</h1>
      {highestPriorityCard ? (
        <Card
          organization={highestPriorityCard.organization}
          availableFood={highestPriorityCard.availableFood}
          tags={highestPriorityCard.tags}
          address={highestPriorityCard.address}
          pax={highestPriorityCard.pax}
        />
      ) : (
        <p>No card found</p>
      )}
    </div>
  );
};

export default Match;
