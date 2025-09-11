import { useState } from 'react';
import { Copy, Download, Star, ThumbsUp, ThumbsDown, ExternalLink, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    citations?: {
      source: string;
      url: string;
      score: number;
    }[];
    createdAt: Date;
    tokens?: number;
  };
}

export function ChatMessage({ message }: ChatMessageProps) {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  const isUser = message.role === 'user';

  const handleFeedback = (type: 'up' | 'down') => {
    if (type === 'down') {
      setShowFeedbackDialog(true);
    } else {
      setFeedback(type);
      // In real app, send feedback to API
    }
  };

  const submitFeedback = () => {
    setFeedback('down');
    setShowFeedbackDialog(false);
    // In real app, send feedback with comment to API
    console.log('Feedback submitted:', { type: 'down', comment: feedbackComment });
    setFeedbackComment('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={cn(
      "flex gap-4 animate-slide-in-up",
      isUser ? "justify-end" : "justify-start"
    )}>
      {!isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="/ai-avatar.png" alt="AI" />
          <AvatarFallback className="bg-primary text-primary-foreground text-xs">
            AI
          </AvatarFallback>
        </Avatar>
      )}
      
      <div className={cn(
        "max-w-3xl",
        isUser ? "order-1" : "order-2"
      )}>
        <Card className={cn(
          "shadow-card",
          isUser ? "bg-primary text-primary-foreground" : "bg-card"
        )}>
          <CardContent className="p-4">
            <div className="space-y-3">
              {/* Message Content */}
              <div className="prose prose-sm max-w-none">
                <p className={cn(
                  "text-sm leading-relaxed",
                  isUser ? "text-primary-foreground" : "text-card-foreground"
                )}>
                  {message.content}
                </p>
              </div>

              {/* Citations */}
              {message.citations && message.citations.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground">
                    Fuentes consultadas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {message.citations.map((citation, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="citation-pill cursor-pointer"
                        onClick={() => window.open(citation.url, '_blank')}
                      >
                        <span className="truncate max-w-[200px]">{citation.source}</span>
                        <span className="ml-1 text-xs opacity-75">
                          {Math.round(citation.score * 100)}%
                        </span>
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Message Metadata */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{formatTime(message.createdAt)}</span>
                  {message.tokens && (
                    <>
                      <span>•</span>
                      <span>{message.tokens} tokens</span>
                    </>
                  )}
                </div>

                {/* Message Actions */}
                {!isUser && (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={copyToClipboard}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <Star className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    
                    <div className="h-4 w-px bg-border mx-1" />
                    
                    <Button
                      variant={feedback === 'up' ? 'default' : 'ghost'}
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleFeedback('up')}
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </Button>
                    
                    <Button
                      variant={feedback === 'down' ? 'destructive' : 'ghost'}
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleFeedback('down')}
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {isUser && (
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarImage src="/user-avatar.png" alt="Usuario" />
          <AvatarFallback className="bg-muted text-xs">
            U
          </AvatarFallback>
        </Avatar>
      )}

      {/* Feedback Dialog */}
      <Dialog open={showFeedbackDialog} onOpenChange={setShowFeedbackDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Feedback sobre la respuesta</DialogTitle>
            <DialogDescription>
              ¿Qué se puede mejorar en esta respuesta? Tu feedback nos ayuda a mejorar el sistema.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Textarea
              placeholder="Describe qué no fue útil o qué se podría mejorar..."
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              rows={4}
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFeedbackDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={submitFeedback}>
              Enviar Feedback
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}