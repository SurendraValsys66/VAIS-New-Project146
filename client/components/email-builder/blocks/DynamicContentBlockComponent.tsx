import React from "react";
import { DynamicContentBlock } from "../types";
import { Zap } from "lucide-react";

interface DynamicContentBlockComponentProps {
  block: DynamicContentBlock;
  isSelected: boolean;
  onFieldNameChange: (fieldName: string) => void;
}

export const DynamicContentBlockComponent: React.FC<
  DynamicContentBlockComponentProps
> = ({ block, isSelected, onFieldNameChange }) => {
  return (
    <div
      className={`relative p-4 transition-all ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
    >
      <div
        style={{
          backgroundColor: block.backgroundColor,
          padding: `${block.padding}px`,
          border: "2px dashed #999",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Zap className="w-4 h-4 text-valasys-orange" />
        <span className="text-sm font-medium text-gray-700">
          {block.placeholder}
        </span>
      </div>
    </div>
  );
};
