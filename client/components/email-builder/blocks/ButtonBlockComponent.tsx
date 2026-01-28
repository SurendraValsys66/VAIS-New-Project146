import React from "react";
import { ButtonBlock } from "../types";

interface ButtonBlockComponentProps {
  block: ButtonBlock;
  isSelected: boolean;
}

export const ButtonBlockComponent: React.FC<ButtonBlockComponentProps> = ({
  block,
  isSelected,
}) => {
  return (
    <div
      className={`p-4 transition-all ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
      style={{ textAlign: block.alignment as any }}
    >
      <button
        style={{
          backgroundColor: block.backgroundColor,
          color: block.textColor,
          padding: `${block.padding}px 20px`,
          borderRadius: `${block.borderRadius}px`,
          border: "none",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
        disabled
      >
        {block.text}
      </button>
    </div>
  );
};
