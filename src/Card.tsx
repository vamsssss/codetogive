import "./Card.css";

interface CardProps {
  organization: string;
  availableFood: string;
  tags: string[];
  address: string;
  pax: number;
}

const Card: React.FC<CardProps> = ({ organization, availableFood, tags, address, pax }) => {
  return (
    <div className="card">
      <p className="card-description">
        Organization: {organization} <br />
        Available Food: {availableFood} <br />
        Tags: {tags.join(", ")} <br />
        Address: {address} <br />
        Pax: {pax} <br />
      </p>
    </div>
  );
};

export default Card;
