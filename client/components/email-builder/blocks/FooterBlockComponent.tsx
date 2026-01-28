import React from "react";
import { FooterBlock } from "../types";

interface FooterBlockComponentProps {
  block: FooterBlock;
  isSelected: boolean;
  onContentChange: (content: string) => void;
}

export const FooterBlockComponent: React.FC<FooterBlockComponentProps> = ({
  block,
  isSelected,
  onContentChange,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);

  return (
    <footer
      className={`transition-all cursor-pointer ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
      style={{
        backgroundColor: block.backgroundColor,
        color: block.textColor,
        fontSize: `${block.fontSize}px`,
        padding: `${block.padding}px`,
        textAlign: "center",
      }}
      onClick={() => setIsEditing(true)}
    >
      {isEditing ? (
        <textarea
          value={block.content}
          onChange={(e) => onContentChange(e.target.value)}
          onBlur={() => setIsEditing(false)}
          autoFocus
          className="w-full border border-valasys-orange rounded px-2 py-1"
        />
      ) : (
        <p>{block.content}</p>
      )}
    </footer>
  );
};
