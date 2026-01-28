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
  const buttonBorder =
    block.borderWidth > 0
      ? `${block.borderWidth}px solid ${block.borderColor}`
      : "none";

  const buttonDisplay =
    block.alignment === "left"
      ? "flex"
      : block.alignment === "right"
        ? "flex"
        : "flex";

  const buttonJustify =
    block.alignment === "left"
      ? "flex-start"
      : block.alignment === "right"
        ? "flex-end"
        : "center";

  const buttonWidth =
    block.widthUnit === "%"
      ? `${block.width}%`
      : `${block.width}px`;

  return (
    <div
      className={`p-4 transition-all ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
      style={{
        display: buttonDisplay,
        justifyContent: buttonJustify,
        margin: `${block.margin}px`,
      }}
    >
      <button
        style={{
          backgroundColor: block.backgroundColor,
          color: block.textColor,
          padding: `${block.padding}px 20px`,
          borderRadius: `${block.borderRadius}px`,
          border: buttonBorder,
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
          width: buttonWidth,
          textAlign: "center",
        }}
        title={block.linkTooltip}
        disabled
      >
        {block.text}
      </button>
    </div>
  );
};
