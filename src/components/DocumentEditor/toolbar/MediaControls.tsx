
import { Editor } from '@tiptap/react';
import { Image, Link } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MediaControlsProps {
  editor: Editor;
  onImageAdd: () => void;
  onLinkAdd: () => void;
}

const MediaControls = ({ editor, onImageAdd, onLinkAdd }: MediaControlsProps) => {
  return (
    <div className="flex items-center gap-1">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={onImageAdd}
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
            onClick={onLinkAdd}
          >
            <Link className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="text-xs py-1">
          Add Link
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default MediaControls;
