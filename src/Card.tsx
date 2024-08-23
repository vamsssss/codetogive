import './Card.css'
interface CardProps {
    description: string;
}

const Card: React.FC<CardProps> = ({ description }) => {
    return (
        <div className="card">

            <p className="card-description">{description}</p>
        </div>
    );
};

export default Card;
