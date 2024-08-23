import './Card.css'
interface CardProps {
    // description: string;
}

const Card: React.FC<CardProps> = () => {
    return (
        <div className="card">

            <p className="card-description">
                Organization:<br/>
                Avaiable Food: <br/>
                tags: <br/>
            </p>
        </div>
    );
};

export default Card;
