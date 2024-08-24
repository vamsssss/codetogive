<<<<<<< HEAD
import './App.css';
import Card from './Card';

function App() {
  return (
    <div className="container">
      {/* Left Panel with Profile and Filter Sections */}
      <div className="leftPanel">
        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-icon">
            {/* Profile Icon (use an actual image or icon component) */}
            <img src="/path/to/profile-icon.png" alt="Profile Icon" className="profile-image" />
          </div>
          <div className="profile-text">
            <p>My Profile</p>
            <p>Log Out</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <h2>Filter by your needs</h2>
          {/* Example filter buttons */}
          <button className="filter-button">Option 1</button>
          <button className="filter-button">Option 2</button>
          <button className="filter-button">Option 3</button>
        </div>
      </div>

      {/* Right Panel with Cards */}
      <div className="rightPanel">
        <div className="card-row">
          <Card />
          <Card />
          <Card />
        </div>
        <div className="card-row">
          <Card />
          <Card />
          <Card />
        </div>
        <div className="results-count">
          6 results
        </div>
      </div>
    </div>
=======
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ProfilePage from "./ProfilePage";
import LeftPanel from "./LeftPanel";
import CardList from "./CardList";

function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
    );
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const tags = ["Halal", "Vegetarian", "Vegan", "Perishable", "Others"];

  const cardData = [
    {
      organization: "Org 1",
      availableFood: "Food 1",
      tags: ["Halal", "Vegan"],
    },
    { organization: "Org 2", availableFood: "Food 2", tags: ["Vegetarian"] },
    {
      organization: "Org 3",
      availableFood: "Food 3",
      tags: ["Others", "Vegan"],
    },
    {
      organization: "Org 4",
      availableFood: "Food 4",
      tags: ["Halal", "Vegetarian"],
    },
    {
      organization: "Org 5",
      availableFood: "Food 5",
      tags: ["Halal", "Others"],
    },
  ];

  const filteredCards = cardData.filter(
    (card) =>
      selectedTags.length === 0 ||
      card.tags.some((tag) => selectedTags.includes(tag))
  );

  return (
    <Routes>
      <Route
        path="/codetogive"
        element={
          <div className={"container"}>
            <LeftPanel
              tags={tags}
              selectedTags={selectedTags}
              onTagClick={handleTagClick}
              onProfileClick={handleProfileClick}
            />
            <CardList filteredCards={filteredCards} />
          </div>
        }
      />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
>>>>>>> db38c0152c9c9875b495a3d78501db4cfbd734f9
  );
}

export default App;
