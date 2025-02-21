
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
import FontSize from './extensions/FontSize';
import { useCallback, useState, KeyboardEvent } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import EditorToolbar from './EditorToolbar';
import { FileText } from 'lucide-react';

const DocumentEditor = () => {
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      FontSize,
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg border border-gray-200',
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
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

    setIsProcessing(true);
    try {
      // Determine if prompt needs enhancement or summarization
      const type = prompt.split(' ').length < 20 ? 'enhance' : 'summarize';
      
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, type }),
      });

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      editor?.commands.setContent(
        `<div class="p-4 rounded-lg" style="background: linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)">
          ${data.content}
        </div>`
      );

      toast({
        title: "Success",
        description: `Content has been ${type}d successfully!`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  }, [prompt, toast, editor]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePromptSubmit();
    }
  };

  const handleExport = (format: 'html' | 'pdf' | 'pptx') => {
    const content = editor?.getHTML();
    if (!content) return;

    switch (format) {
      case 'html': {
        const fullHtml = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <title>Document Export</title>
              <style>
                body { margin: 0; padding: 20px; }
                .content { max-width: 800px; margin: 0 auto; }
              </style>
            </head>
            <body>
              <div class="content">
                ${content}
              </div>
            </body>
          </html>
        `;
        const blob = new Blob([fullHtml], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.html';
        a.click();
        window.URL.revokeObjectURL(url);
        break;
      }
      default:
        toast({
          title: "Coming Soon",
          description: `${format.toUpperCase()} export will be available in the next update`,
        });
    }
  };

  return (
    <div className="container mx-auto py-6 px-4 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden bg-editor-background border-editor-border shadow-lg">
            <EditorToolbar editor={editor} />
            <div className="min-h-[600px] bg-white">
              <EditorContent editor={editor} />
            </div>
          </Card>
        </div>

        <div className="space-y-6">
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
              disabled={isProcessing}
            >
              <FileText className="w-4 h-4" />
              {isProcessing ? 'Generating...' : 'Generate Content'}
            </Button>
          </Card>

          <Card className="p-4">
            <h3 className="font-semibold mb-3">Export Options</h3>
            <Button 
              variant="outline" 
              className="w-full mb-2"
              onClick={() => handleExport('html')}
            >
              Export as HTML
            </Button>
            <Button 
              variant="outline" 
              className="w-full mb-2"
              onClick={() => handleExport('pdf')}
            >
              Export as PDF
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => handleExport('pptx')}
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
