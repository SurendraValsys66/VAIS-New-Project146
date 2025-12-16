import React from "react";
import { ContentBlock } from "./types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface SettingsPanelProps {
  block: ContentBlock | null;
  onBlockUpdate: (block: ContentBlock) => void;
  onBlockDelete: () => void;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  block,
  onBlockUpdate,
  onBlockDelete,
}) => {
  if (!block) {
    return (
      <div className="bg-white border-l border-gray-200 p-4 h-full flex items-center justify-center">
        <p className="text-gray-500 text-sm">Select a block to edit</p>
      </div>
    );
  }

  const renderSettings = () => {
    switch (block.type) {
      case "title":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="titleContent">Content</Label>
              <textarea
                id="titleContent"
                value={block.content}
                onChange={(e) =>
                  onBlockUpdate({ ...block, content: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="titleFontSize">Font Size</Label>
              <Input
                id="titleFontSize"
                type="number"
                min="12"
                max="72"
                value={block.fontSize}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    fontSize: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="titleFontColor">Text Color</Label>
              <Input
                id="titleFontColor"
                type="color"
                value={block.fontColor}
                onChange={(e) =>
                  onBlockUpdate({ ...block, fontColor: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="titleBgColor">Background Color</Label>
              <Input
                id="titleBgColor"
                type="color"
                value={block.backgroundColor}
                onChange={(e) =>
                  onBlockUpdate({ ...block, backgroundColor: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="titleAlignment">Alignment</Label>
              <select
                id="titleAlignment"
                value={block.alignment}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    alignment: e.target.value as any,
                  })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        );
      case "text":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="content">Content</Label>
              <textarea
                id="content"
                value={block.content}
                onChange={(e) =>
                  onBlockUpdate({ ...block, content: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="fontSize">Font Size</Label>
              <Input
                id="fontSize"
                type="number"
                min="8"
                max="72"
                value={block.fontSize}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    fontSize: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="fontColor">Text Color</Label>
              <Input
                id="fontColor"
                type="color"
                value={block.fontColor}
                onChange={(e) =>
                  onBlockUpdate({ ...block, fontColor: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="bgColor">Background Color</Label>
              <Input
                id="bgColor"
                type="color"
                value={block.backgroundColor}
                onChange={(e) =>
                  onBlockUpdate({ ...block, backgroundColor: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="alignment">Alignment</Label>
              <select
                id="alignment"
                value={block.alignment}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    alignment: e.target.value as any,
                  })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div>
              <Label htmlFor="fontWeight">Font Weight</Label>
              <select
                id="fontWeight"
                value={block.fontWeight}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    fontWeight: e.target.value as any,
                  })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="normal">Normal</option>
                <option value="bold">Bold</option>
              </select>
            </div>
          </div>
        );
      case "image":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="width">Width (px)</Label>
              <Input
                id="width"
                type="number"
                value={block.width}
                onChange={(e) =>
                  onBlockUpdate({ ...block, width: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <Label htmlFor="height">Height (px)</Label>
              <Input
                id="height"
                type="number"
                value={block.height}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    height: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="imgAlignment">Alignment</Label>
              <select
                id="imgAlignment"
                value={block.alignment}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    alignment: e.target.value as any,
                  })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        );
      case "button":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="btnText">Button Text</Label>
              <Input
                id="btnText"
                value={block.text}
                onChange={(e) =>
                  onBlockUpdate({ ...block, text: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="btnLink">Link</Label>
              <Input
                id="btnLink"
                value={block.link}
                onChange={(e) =>
                  onBlockUpdate({ ...block, link: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="btnBgColor">Button Color</Label>
              <Input
                id="btnBgColor"
                type="color"
                value={block.backgroundColor}
                onChange={(e) =>
                  onBlockUpdate({ ...block, backgroundColor: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="btnTextColor">Text Color</Label>
              <Input
                id="btnTextColor"
                type="color"
                value={block.textColor}
                onChange={(e) =>
                  onBlockUpdate({ ...block, textColor: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="btnAlignment">Alignment</Label>
              <select
                id="btnAlignment"
                value={block.alignment}
                onChange={(e) =>
                  onBlockUpdate({
                    ...block,
                    alignment: e.target.value as any,
                  })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
              >
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
        );
      case "divider":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="dividerColor">Color</Label>
              <Input
                id="dividerColor"
                type="color"
                value={block.color}
                onChange={(e) =>
                  onBlockUpdate({ ...block, color: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="dividerHeight">Height (px)</Label>
              <Input
                id="dividerHeight"
                type="number"
                value={block.height}
                onChange={(e) =>
                  onBlockUpdate({ ...block, height: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <Label htmlFor="dividerMargin">Margin (px)</Label>
              <Input
                id="dividerMargin"
                type="number"
                value={block.margin}
                onChange={(e) =>
                  onBlockUpdate({ ...block, margin: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
        );
      case "header":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="headerBgColor">Background Color</Label>
              <Input
                id="headerBgColor"
                type="color"
                value={block.backgroundColor}
                onChange={(e) =>
                  onBlockUpdate({ ...block, backgroundColor: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="headerPadding">Padding (px)</Label>
              <Input
                id="headerPadding"
                type="number"
                value={block.padding}
                onChange={(e) =>
                  onBlockUpdate({ ...block, padding: parseInt(e.target.value) })
                }
              />
            </div>
          </div>
        );
      case "footer":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="footerContent">Content</Label>
              <textarea
                id="footerContent"
                value={block.content}
                onChange={(e) =>
                  onBlockUpdate({ ...block, content: e.target.value })
                }
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="footerBgColor">Background Color</Label>
              <Input
                id="footerBgColor"
                type="color"
                value={block.backgroundColor}
                onChange={(e) =>
                  onBlockUpdate({ ...block, backgroundColor: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="footerTextColor">Text Color</Label>
              <Input
                id="footerTextColor"
                type="color"
                value={block.textColor}
                onChange={(e) =>
                  onBlockUpdate({ ...block, textColor: e.target.value })
                }
              />
            </div>
          </div>
        );
      case "spacer":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="spacerHeight">Height (px)</Label>
              <Input
                id="spacerHeight"
                type="number"
                value={block.height}
                onChange={(e) =>
                  onBlockUpdate({ ...block, height: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <Label htmlFor="spacerBgColor">Background Color</Label>
              <Input
                id="spacerBgColor"
                type="color"
                value={block.backgroundColor}
                onChange={(e) =>
                  onBlockUpdate({ ...block, backgroundColor: e.target.value })
                }
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border-l border-gray-200 p-4 h-full overflow-y-auto max-w-xs">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Block Settings</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={onBlockDelete}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
      {renderSettings()}
    </div>
  );
};
