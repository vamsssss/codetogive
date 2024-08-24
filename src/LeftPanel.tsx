import React from "react";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

interface LeftPanelProps {
  tags: string[];
  selectedTags: string[];
  onTagClick: (tag: string) => void;
  onProfileClick: () => void;
  onLogOutClick: () => void;
}

const LeftPanel: React.FC<LeftPanelProps> = ({
  tags,
  selectedTags,
  onTagClick,
  onProfileClick,
  onLogOutClick,
}) => {
  return (
    <div className={"leftPanel"}>
      <img
        src="src/assets/mock-profile-pic.jpg"
        alt="Profile"
        className="profile-photo"
      />
      <p className="filter-text">Filter by your needs</p>
      <div className="tags-container">
        {tags.map((tag) => (
          <div
            key={tag}
            className={`tag ${selectedTags.includes(tag) ? "selected" : ""}`}
            onClick={() => onTagClick(tag)}
          >
            {tag}
            {selectedTags.includes(tag) && (
              <span
                className="remove-tag"
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
              >
                x
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="button-group">
        <button className="transparent-button" onClick={onProfileClick}>
          <FaUser className="icon" /> My Profile
        </button>
        <button className="transparent-button" onClick={onLogOutClick}>
          <FaSignOutAlt className="icon" /> Log Out
        </button>
      </div>
    </div>
  );
};

export default LeftPanel;
