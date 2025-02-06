'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Bold,
  Italic,
  LinkIcon,
  List,
  Image,
  Code,
  Quote,
  Copy,
  Download,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { AnimatedCard } from '@/components/ui/animated-card';

export default function GeneratePage() {
  const [markdown, setMarkdown] = useState('');
  const [copied, setCopied] = useState(false);

  const insertMarkdown = (type: string) => {
    const templates: Record<string, string> = {
      bold: '**bold text**',
      italic: '*italic text*',
      link: '[link text](url)',
      list: '- list item',
      image: '![alt text](image url)',
      code: '`inline code`',
      quote: '> quote text',
    };

    setMarkdown((prev) => prev + (templates[type] || ''));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error copying:', err);
    }
  };

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container py-12 lg:py-16 min-h-[calc(100vh-5rem)]">
      <div className="max-w-[90rem] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-discord-text-primary mb-2">
            Markdown Editor
          </h1>
          <p className="text-discord-text-secondary text-lg">
            Create your README.md with an intuitive interface
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 h-full">
          <div className="flex flex-col space-y-4 animate-slide-in-left">
            <div className="flex items-center justify-between p-3 bg-discord-secondary rounded-lg shadow-lg">
              <div className="flex items-center space-x-2">
                {[
                  { icon: Bold, action: 'bold', label: 'Bold' },
                  { icon: Italic, action: 'italic', label: 'Italic' },
                  { icon: LinkIcon, action: 'link', label: 'Link' },
                  { icon: List, action: 'list', label: 'List' },
                  { icon: Image, action: 'image', label: 'Image' },
                  { icon: Code, action: 'code', label: 'Code' },
                  { icon: Quote, action: 'quote', label: 'Quote' },
                ].map(({ icon: Icon, action, label }) => (
                  <Button
                    key={action}
                    variant="ghost"
                    size="icon"
                    onClick={() => insertMarkdown(action)}
                    className="text-discord-text-secondary hover:text-discord-text-primary hover:bg-discord-tertiary transition-all duration-200 hover:scale-110 w-10 h-10">
                    <Icon className="h-5 w-5" />
                    <span className="sr-only">{label}</span>
                  </Button>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  className={`transition-all duration-200 hover:scale-110 w-10 h-10 ${
                    copied
                      ? 'text-discord-green'
                      : 'text-discord-text-secondary hover:text-discord-text-primary'
                  }`}>
                  <Copy className="h-5 w-5" />
                  <span className="sr-only">Copy</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={downloadMarkdown}
                  className="text-discord-text-secondary hover:text-discord-text-primary transition-all duration-200 hover:scale-110 w-10 h-10">
                  <Download className="h-5 w-5" />
                  <span className="sr-only">Download</span>
                </Button>
              </div>
            </div>
            <div className="relative flex-1">
              <textarea
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                placeholder="Write your markdown here..."
                className="absolute inset-0 w-full h-full rounded-lg bg-discord-secondary p-6 text-discord-text-primary placeholder-discord-text-secondary border-2 border-discord-tertiary focus:outline-none focus:ring-2 focus:ring-discord-primary font-mono resize-none transition-all duration-300 hover:border-discord-primary/50 text-base leading-relaxed shadow-lg"
              />
            </div>
          </div>
          <AnimatedCard className="min-h-[calc(100vh-16rem)] overflow-auto animate-slide-in-right p-8 shadow-lg">
            <div className="markdown-content prose-lg">
              <ReactMarkdown>
                {markdown || '# Preview\nYour content will appear here...'}
              </ReactMarkdown>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
