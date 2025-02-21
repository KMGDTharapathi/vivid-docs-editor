import { Editor } from '@tiptap/react';
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  List,
  ListOrdered,
  Image,
  Link,
  Palette,
  Type,
} from 'lucide-react';
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
  TooltipProvider,
} from "@/components/ui/tooltip";
import { useCallback } from 'react';

interface EditorToolbarProps {
  editor: Editor | null;
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

const fontFamilies = [
  { name: 'Arial', value: 'Arial' },
  { name: 'Times New Roman', value: 'Times New Roman' },
  { name: 'Helvetica', value: 'Helvetica' },
  { name: 'Georgia', value: 'Georgia' },
];

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) return null;

  const fontSizes = [
    { label: 'Small', value: '12px' },
    { label: 'Normal', value: '16px' },
    { label: 'Large', value: '20px' },
    { label: 'Extra Large', value: '24px' },
  ];

  const addImage = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          editor.chain().focus().setImage({ src: imageUrl }).run();
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  }, [editor]);

  const setLink = useCallback(() => {
    const url = window.prompt('Enter URL');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  }, [editor]);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="border-b border-editor-border bg-editor-toolbar p-2 flex flex-wrap gap-1">
        {/* Text Formatting Section */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8">
                    Font Size
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {fontSizes.map((size) => (
                    <DropdownMenuItem
                      key={size.value}
                      onClick={() => {
                        editor.chain().focus().setFontSize(size.value).run();
                      }}
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

          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Palette className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {pageColors.map((color) => (
                    <DropdownMenuItem
                      key={color.value}
                      onClick={() => {
                        const editorElement = editor.view.dom as HTMLElement;
                        editorElement.style.backgroundColor = color.value;
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

          <Tooltip>
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8">
                    Font
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {fontFamilies.map((font) => (
                    <DropdownMenuItem
                      key={font.value}
                      onClick={() => {
                        editor.chain().focus().setFontFamily(font.value).run();
                      }}
                    >
                      <span style={{ fontFamily: font.value }}>{font.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs py-1">
              Font Family
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-editor-border mx-1" />

        {/* Alignment Section */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive({ textAlign: 'left' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('left').run()}
              >
                <AlignLeft className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs py-1">
              Align Left
            </TooltipContent>
          </Tooltip>
        
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive({ textAlign: 'center' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('center').run()}
              >
                <AlignCenter className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs py-1">
              Align Center
            </TooltipContent>
          </Tooltip>
        
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive({ textAlign: 'right' })}
                onPressedChange={() => editor.chain().focus().setTextAlign('right').run()}
              >
                <AlignRight className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs py-1">
              Align Right
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-editor-border mx-1" />

        {/* Lists Section */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive('bulletList')}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs py-1">
              Bullet List
            </TooltipContent>
          </Tooltip>
        
          <Tooltip>
            <TooltipTrigger asChild>
              <Toggle
                pressed={editor.isActive('orderedList')}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="h-4 w-4" />
              </Toggle>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs py-1">
              Numbered List
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="w-px h-6 bg-editor-border mx-1" />

        {/* Media Section */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={addImage}
              >
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs py-1">
              Add Image
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={setLink}
              >
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs py-1">
              Add Link
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default EditorToolbar;
