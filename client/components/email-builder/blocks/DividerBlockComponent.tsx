import React from "react";
import { DividerBlock } from "../types";

interface DividerBlockComponentProps {
  block: DividerBlock;
  isSelected: boolean;
}

export const DividerBlockComponent: React.FC<DividerBlockComponentProps> = ({
  block,
  isSelected,
}) => {
  return (
    <div
      className={`p-4 transition-all ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
    >
      <hr
        style={{
          border: "none",
          borderTop: `${block.height}px solid ${block.color}`,
          margin: `${block.margin}px 0`,
        }}
      />
    </div>
  );
};
