import "./Card.css";

interface CardProps {
  organization: string;
  availableFood: string;
  tags: string[];
}

const Card: React.FC<CardProps> = ({ organization, availableFood, tags }) => {
  return (
    <div className="card">
      <p className="card-description">
        Organization: {organization} <br />
        Available Food: {availableFood} <br />
        Tags: {tags.join(", ")} <br />
      </p>
    </div>
  );
};

export default Card;
