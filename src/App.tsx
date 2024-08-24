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
        path="/"
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
  );
}

export default App;
