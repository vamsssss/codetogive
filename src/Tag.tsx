import React from "react";

interface TagProps {
  tag: string;
  isSelected: boolean;
  onClick: () => void;
}

const Tag: React.FC<TagProps> = ({ tag, isSelected, onClick }) => {
  return (
    <div className={`tag ${isSelected ? "selected" : ""}`} onClick={onClick}>
      {tag}
      {isSelected && (
        <span
          className="remove-tag"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        >
          x
        </span>
      )}
    </div>
  );
};

export default Tag;
