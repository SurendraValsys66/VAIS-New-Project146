import React from "react";
import { LogoBlock } from "../types";

interface LogoBlockComponentProps {
  block: LogoBlock;
  isSelected: boolean;
  onSrcChange: (src: string) => void;
}

export const LogoBlockComponent: React.FC<LogoBlockComponentProps> = ({
  block,
  isSelected,
  onSrcChange,
}) => {
  return (
    <div
      className={`relative p-4 transition-all ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
    >
      <div style={{ textAlign: block.alignment as any }}>
        {block.src ? (
          <img
            src={block.src}
            alt={block.alt}
            style={{
              width: `${block.width}px`,
              height: `${block.height}px`,
              display: block.alignment === "center" ? "block" : "inline",
              margin: block.alignment === "center" ? "0 auto" : "0",
            }}
          />
        ) : (
          <div
            style={{
              width: `${block.width}px`,
              height: `${block.height}px`,
              backgroundColor: "#f0f0f0",
              border: "2px dashed #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              borderRadius: "4px",
              margin: block.alignment === "center" ? "0 auto" : "0",
            }}
          >
            <span className="text-sm">Logo Image</span>
          </div>
        )}
      </div>
    </div>
  );
};
