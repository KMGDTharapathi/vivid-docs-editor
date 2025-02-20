
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import FontFamily from '@tiptap/extension-font-family';
import { useCallback, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";
import EditorToolbar from './EditorToolbar';
import DocumentUpload from './DocumentUpload';
import { Bold, FileText, Upload } from 'lucide-react';

const DocumentEditor = () => {
  const [prompt, setPrompt] = useState('');
  const { toast } = useToast();
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      FontFamily,
    ],
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[500px] max-w-none p-6',
      },
    },
    content: '<p>Your document preview will appear here...</p>',
  });

  const handlePromptSubmit = useCallback(async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt first",
        variant: "destructive",
      });
      return;
    }

    // TODO: Implement AI generation
    toast({
      title: "Generating content",
      description: "Your AI-generated content will appear soon...",
    });
  }, [prompt, toast]);

  return (
    <div className="container mx-auto py-6 px-4 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor Section */}
        <div className="lg:col-span-2">
          <Card className="overflow-hidden bg-editor-background border-editor-border shadow-lg">
            <EditorToolbar editor={editor} />
            <div className="min-h-[600px] bg-white">
              <EditorContent editor={editor} />
            </div>
          </Card>
        </div>

        {/* Controls Section */}
        <div className="space-y-6">
          {/* Prompt Input */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Enter Prompt</h3>
            <Textarea 
              placeholder="Enter your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="mb-3"
            />
            <Button 
              onClick={handlePromptSubmit}
              className="w-full gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate Content
            </Button>
          </Card>

          {/* Document Upload */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Upload Document</h3>
            <DocumentUpload />
          </Card>

          {/* Export Options */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Export Options</h3>
            <Button 
              variant="outline" 
              className="w-full mb-2"
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "PDF export will be available in the next update",
                });
              }}
            >
              Export as PDF
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                toast({
                  title: "Coming Soon",
                  description: "PPTX export will be available in the next update",
                });
              }}
            >
              Export as PPTX
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
