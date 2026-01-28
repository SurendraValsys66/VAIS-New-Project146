import React from "react";
import { TwoColumnCardBlock } from "../types";
import { renderBlockToHTML } from "../utils";

interface TwoColumnCardBlockComponentProps {
  block: TwoColumnCardBlock;
  isSelected: boolean;
  onUpdate: (block: TwoColumnCardBlock) => void;
}

export const TwoColumnCardBlockComponent: React.FC<
  TwoColumnCardBlockComponentProps
> = ({ block, isSelected, onUpdate }) => {
  // Render the HTML representation
  const html = renderBlockToHTML(block);

  return (
    <div
      className={`w-full rounded-lg overflow-hidden transition-all ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
