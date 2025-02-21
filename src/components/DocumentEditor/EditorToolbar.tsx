
import { Editor } from '@tiptap/react';
import { TooltipProvider } from "@/components/ui/tooltip";
import TextFormatting from './toolbar/TextFormatting';
import AlignmentControls from './toolbar/AlignmentControls';
import ListControls from './toolbar/ListControls';
import MediaControls from './toolbar/MediaControls';
import ColorControls from './toolbar/ColorControls';
import { useCallback } from 'react';

interface EditorToolbarProps {
  editor: Editor | null;
}

const EditorToolbar = ({ editor }: EditorToolbarProps) => {
  if (!editor) return null;

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
        <TextFormatting editor={editor} />
        <div className="w-px h-6 bg-editor-border mx-1" />
        <ColorControls editor={editor} />
        <div className="w-px h-6 bg-editor-border mx-1" />
        <AlignmentControls editor={editor} />
        <div className="w-px h-6 bg-editor-border mx-1" />
        <ListControls editor={editor} />
        <div className="w-px h-6 bg-editor-border mx-1" />
        <MediaControls editor={editor} onImageAdd={addImage} onLinkAdd={setLink} />
      </div>
    </TooltipProvider>
  );
};

export default EditorToolbar;
