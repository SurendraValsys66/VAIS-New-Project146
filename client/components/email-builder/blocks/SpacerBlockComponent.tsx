import React from "react";
import { SpacerBlock } from "../types";

interface SpacerBlockComponentProps {
  block: SpacerBlock;
  isSelected: boolean;
}

export const SpacerBlockComponent: React.FC<SpacerBlockComponentProps> = ({
  block,
  isSelected,
}) => {
  return (
    <div
      className={`transition-all ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
      style={{
        height: `${block.height}px`,
        backgroundColor: block.backgroundColor,
        minHeight: "10px",
      }}
    />
  );
};
