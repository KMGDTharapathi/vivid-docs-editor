
import { Editor } from '@tiptap/react';
import { Palette, Type } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ColorControlsProps {
  editor: Editor;
}

const pageColors = [
  { name: 'White', value: '#ffffff' },
  { name: 'Soft Green', value: '#F2FCE2' },
  { name: 'Soft Yellow', value: '#FEF7CD' },
  { name: 'Soft Orange', value: '#FEC6A1' },
  { name: 'Soft Purple', value: '#E5DEFF' },
  { name: 'Soft Pink', value: '#FFDEE2' },
  { name: 'Soft Blue', value: '#D3E4FD' },
];

const gradients = [
  { name: 'Sunset', value: 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)' },
  { name: 'Ocean', value: 'linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)' },
  { name: 'Forest', value: 'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)' },
  { name: 'Lavender', value: 'linear-gradient(90deg, hsla(277, 75%, 84%, 1) 0%, hsla(297, 50%, 51%, 1) 100%)' },
];

const fontColors = [
  { name: 'Black', value: '#000000' },
  { name: 'Primary Purple', value: '#9b87f5' },
  { name: 'Ocean Blue', value: '#0EA5E9' },
  { name: 'Bright Orange', value: '#F97316' },
  { name: 'Red', value: '#ea384c' },
];

const highlightColors = [
  { name: 'Yellow', value: '#fff9c4' },
  { name: 'Green', value: '#e8f5e9' },
  { name: 'Pink', value: '#fce4ec' },
  { name: 'Blue', value: '#e3f2fd' },
];

const ColorControls = ({ editor }: ColorControlsProps) => {
  return (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Palette className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64">
              <div className="p-2">
                <div className="mb-2 font-semibold text-sm">Solid Colors</div>
                <div className="grid grid-cols-4 gap-1 mb-4">
                  {pageColors.map((color) => (
                    <button
                      key={color.value}
                      className="w-12 h-12 rounded border hover:scale-105 transition-transform"
                      style={{ backgroundColor: color.value }}
                      onClick={() => {
                        const editorElement = editor.view.dom as HTMLElement;
                        editorElement.style.backgroundColor = color.value;
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
                <div className="mb-2 font-semibold text-sm">Gradients</div>
                <div className="grid grid-cols-2 gap-1">
                  {gradients.map((gradient) => (
                    <button
                      key={gradient.value}
                      className="w-full h-12 rounded border hover:scale-105 transition-transform"
                      style={{ background: gradient.value }}
                      onClick={() => {
                        const editorElement = editor.view.dom as HTMLElement;
                        editorElement.style.background = gradient.value;
                      }}
                      title={gradient.name}
                    />
                  ))}
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs py-1">
          Page Color
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Type className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {fontColors.map((color) => (
                <DropdownMenuItem
                  key={color.value}
                  onClick={() => {
                    editor.chain().focus().setColor(color.value).run();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: color.value }}
                    />
                    {color.name}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs py-1">
          Text Color
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 relative">
                <Type className="h-4 w-4" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-yellow-200 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {highlightColors.map((color) => (
                <DropdownMenuItem
                  key={color.value}
                  onClick={() => {
                    editor.chain().focus().toggleHighlight({ color: color.value }).run();
                  }}
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded border"
                      style={{ backgroundColor: color.value }}
                    />
                    {color.name}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs py-1">
          Highlight
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default ColorControls;
