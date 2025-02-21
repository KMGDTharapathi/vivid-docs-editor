
import { Editor } from '@tiptap/react';
import { Bold, Italic, Underline, Type } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
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

interface TextFormattingProps {
  editor: Editor;
}

const fontSizes = [
  { label: 'Small', value: '12px' },
  { label: 'Normal', value: '16px' },
  { label: 'Large', value: '20px' },
  { label: 'Extra Large', value: '24px' },
];

const TextFormatting = ({ editor }: TextFormattingProps) => {
  return (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 flex gap-1 items-center">
                <Type className="h-4 w-4" />
                Font Size
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {fontSizes.map((size) => (
                <DropdownMenuItem
                  key={size.value}
                  onClick={() => editor.chain().focus().setFontSize(size.value).run()}
                >
                  <span style={{ fontSize: size.value }}>{size.label}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs py-1">
          Font Size
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            pressed={editor.isActive('bold')}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs py-1">
          Bold
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            pressed={editor.isActive('italic')}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs py-1">
          Italic
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            pressed={editor.isActive('underline')}
            onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
          >
            <Underline className="h-4 w-4" />
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs py-1">
          Underline
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default TextFormatting;
