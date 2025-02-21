
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
import { useCallback, useState, KeyboardEvent } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import EditorToolbar from './EditorToolbar';
import { FileText } from 'lucide-react';

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
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg border border-gray-200',
        },
      }),
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
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none min-h-[500px] max-w-none p-6 prose-headings:text-primary prose-p:text-gray-700 prose-img:rounded-lg',
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

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePromptSubmit();
    }
  };

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
              placeholder="Enter your prompt... Press Enter to generate content"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              className="mb-3 min-h-[200px] resize-none"
            />
            <Button 
              onClick={handlePromptSubmit}
              className="w-full gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate Content
            </Button>
          </Card>

          {/* Export Options */}
          <Card className="p-4">
            <h3 className="font-semibold mb-3">Export Options</h3>
            <Button 
              variant="outline" 
              className="w-full mb-2"
              onClick={() => {
                const content = editor?.getHTML();
                const blob = new Blob([content || ''], { type: 'text/html' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'document.html';
                a.click();
                window.URL.revokeObjectURL(url);
              }}
            >
              Export as HTML
            </Button>
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
