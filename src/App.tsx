import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ProfilePage from "./ProfilePage";
import TryMaps from "./TryMaps";
import TryTelegram from "./TryTelegram";
import LeftPanel from "./LeftPanel";
import CardList from "./CardList";
import MapMarkers from "./MapMarkers";

function App() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [minPax, setMinPax] = useState<number>(0);
  const [maxPax, setMaxPax] = useState<number>(50);
  const [hasInitializedPax, setHasInitializedPax] = useState<boolean>(false);
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

  const handleLogOutClick = () => {
    navigate("/"); //replace with login page path
  };

  const handleMinPaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPax(Number(e.target.value));
  };

  const handleMaxPaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPax(Number(e.target.value));
  };

  const tags = ["Halal", "Vegetarian", "Vegan", "Perishable", "Others"];

  const [cardData, setCardData] = useState<Card[]>([
    {
      organization: "Org 1",
      availableFood: "Food 1",
      tags: ["Halal", "Vegan"],
      address:
        "Lower Kent Ridge Road, National University of Singapore, Singapore",
      pax: 7,
    },
    {
      organization: "Org 2",
      availableFood: "Food 2",
      tags: ["Vegetarian"],
      address: "National University Of Singapore",
      pax: 20,
    },
    {
      organization: "Org 3",
      availableFood: "Food 3",
      tags: ["Others", "Vegan"],
      address: "Nanyang Technological University",
      pax: 1,
    },
    {
      organization: "Org 4",
      availableFood: "Food 4",
      tags: ["Halal", "Vegetarian"],
      address: "Singapore Management University",
      pax: 42,
    },
    {
      organization: "Org 5",
      availableFood: "Food 5",
      tags: ["Halal", "Others"],
      address: "Nanyang Technological University",
      pax: 19,
    },
    {
      organization: "Org 6",
      availableFood: "Food 6",
      tags: ["Halal", "Others"],
      address: "Nanyang Technological University",
      pax: 19,
    },
  ]);

  useEffect(() => {
    if (!hasInitializedPax && cardData.length > 0) {
      const paxValues = cardData.map((card) => card.pax);
      setMinPax(Math.min(...paxValues));
      setMaxPax(Math.max(...paxValues));
      setHasInitializedPax(true);
    }
  }, [cardData, hasInitializedPax]);

  const filteredCards = cardData.filter(
    (card) =>
      (selectedTags.length === 0 ||
        card.tags.some((tag) => selectedTags.includes(tag))) &&
      card.pax >= minPax &&
      card.pax <= maxPax
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
              onLogOutClick={handleLogOutClick}
              minPax={minPax}
              maxPax={maxPax}
              onMinPaxChange={handleMinPaxChange}
              onMaxPaxChange={handleMaxPaxChange}
            />
            <div className="right">
              <div className="card-list-container">
                <CardList filteredCards={filteredCards} />
              </div>
              <div className="card-count-wrapper">
                <div className="card-count-container">
                  <span>{filteredCards.length} item(s)</span>
                </div>
              </div>
              <div className="map-markers-container">
                <MapMarkers cardData={filteredCards} />
              </div>
            </div>
          </div>
        }
      />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/trymaps" element={<TryMaps />} />
      <Route path="/trytelegram" element={<TryTelegram />} />
    </Routes>
  );
}

export default App;
