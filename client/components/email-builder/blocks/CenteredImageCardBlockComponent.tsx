import React, { useState } from "react";
import { CenteredImageCardBlock } from "../types";
import { Upload, Edit2 } from "lucide-react";
import { Input } from "@/components/ui/input";

interface CenteredImageCardBlockComponentProps {
  block: CenteredImageCardBlock;
  isSelected: boolean;
  onBlockUpdate: (block: CenteredImageCardBlock) => void;
}

export const CenteredImageCardBlockComponent: React.FC<
  CenteredImageCardBlockComponentProps
> = ({ block, isSelected, onBlockUpdate }) => {
  const [editMode, setEditMode] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onBlockUpdate({ ...block, image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFieldChange = (
    field: keyof CenteredImageCardBlock,
    value: string,
  ) => {
    onBlockUpdate({ ...block, [field]: value });
  };

  return (
    <div
      className={`p-4 rounded-lg transition-all ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
      style={{
        backgroundColor: block.backgroundColor,
        border: `${block.borderWidth}px solid ${block.borderColor}`,
        borderRadius: `${block.borderRadius}px`,
        margin: `${block.margin}px`,
      }}
    >
      <div className="max-w-md mx-auto">
        <div className="relative group mb-4">
          {block.image ? (
            <>
              <img
                src={block.image}
                alt={block.imageAlt}
                className="w-full h-auto rounded-t-lg"
              />
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 opacity-0 group-hover:opacity-100 transition-all cursor-pointer rounded-t-lg">
                <Upload className="w-6 h-6 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </>
          ) : (
            <label className="flex items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-t-lg cursor-pointer hover:bg-gray-50">
              <div className="flex flex-col items-center justify-center">
                <Upload className="w-6 h-6 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Click to upload</p>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>

        <div className="p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
              <Edit2 className="w-3 h-3" />
              Title
            </label>
            {editMode === "title" ? (
              <Input
                value={block.title}
                onChange={(e) => handleFieldChange("title", e.target.value)}
                onBlur={() => setEditMode(null)}
                autoFocus
                className="text-center font-bold text-lg"
              />
            ) : (
              <p
                onClick={() => setEditMode("title")}
                className="text-center font-bold text-lg text-gray-900 cursor-pointer hover:text-valasys-orange p-2 rounded hover:bg-orange-50"
              >
                {block.title}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
              <Edit2 className="w-3 h-3" />
              Description
            </label>
            {editMode === "description" ? (
              <textarea
                value={block.description}
                onChange={(e) =>
                  handleFieldChange("description", e.target.value)
                }
                onBlur={() => setEditMode(null)}
                autoFocus
                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-600 min-h-16"
              />
            ) : (
              <p
                onClick={() => setEditMode("description")}
                className="text-center text-sm text-gray-600 cursor-pointer hover:text-valasys-orange p-2 rounded hover:bg-orange-50"
              >
                {block.description}
              </p>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
              <Edit2 className="w-3 h-3" />
              Button Text
            </label>
            {editMode === "buttonText" ? (
              <Input
                value={block.buttonText}
                onChange={(e) =>
                  handleFieldChange("buttonText", e.target.value)
                }
                onBlur={() => setEditMode(null)}
                autoFocus
                className="text-center"
              />
            ) : (
              <button
                onClick={() => setEditMode("buttonText")}
                className="w-full py-2 px-4 bg-valasys-orange text-white rounded text-sm font-bold hover:bg-orange-600 cursor-pointer"
              >
                {block.buttonText}
              </button>
            )}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-600 flex items-center gap-2">
              <Edit2 className="w-3 h-3" />
              Button Link
            </label>
            {editMode === "buttonLink" ? (
              <Input
                value={block.buttonLink}
                onChange={(e) =>
                  handleFieldChange("buttonLink", e.target.value)
                }
                onBlur={() => setEditMode(null)}
                autoFocus
                placeholder="https://example.com"
                className="text-sm"
              />
            ) : (
              <p
                onClick={() => setEditMode("buttonLink")}
                className="text-xs text-gray-500 cursor-pointer hover:text-valasys-orange p-2 rounded hover:bg-orange-50 break-all"
              >
                {block.buttonLink || "No link set"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
