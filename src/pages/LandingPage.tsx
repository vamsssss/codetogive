import React from "react";
import './LandingPage.css'
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')
    }
    const handleRegister = () => {
        navigate('/register')
    }
    return (
        <div className="full-container">
            <div className="top-panel">
                <button className="button" onClick={handleLogin}>Login</button>
                <button className="button" onClick={handleRegister}>Sign up</button>
            </div>
            <div className="upper-container">
                <p className="line-1">Spread Your Love</p>
                <p className="line-2">with a meal</p>
            </div>
            <div className="image-container">

                <div className="first">
                    <img src="src/assets/landing-1.png" alt="Image 1"/>
                    <img src="src/assets/semi-first.png" alt="Image 6"/>

                </div>
                <div className="second">
                    <img src="src/assets/landing-2.png" alt="Image 2"/>
                </div>
                <div className="third">
                    <img src="src/assets/landing-3.png" alt="Image 3"/>
                </div>
                <div className="forth">
                    <img src="src/assets/landing-4.png" alt="Image 4"/>
                </div>
                <div className="fifth">
                    <img src="src/assets/landing-5.png" alt="Image 5"/>
                    <img src="src/assets/semi-last.png" alt="Image 5"/>
                </div>
                {/* Add more images as needed */}
            </div>
        </div>
    );
};


export default LandingPage;
