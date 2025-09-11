import { useState } from 'react';
import { Send, Paperclip, Settings, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatMessage } from '@/components/chat/ChatMessage';
import { useChatStore } from '@/lib/store';

export default function Chat() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { activeConversation, conversations, addMessage } = useChatStore();

  const activeConv = conversations.find(c => c.id === activeConversation);

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (activeConversation) {
        const newMessage = {
          id: Date.now().toString(),
          role: 'user' as const,
          content: message,
          createdAt: new Date(),
        };
        
        addMessage(activeConversation, newMessage);
        
        // Simulate AI response
        setTimeout(() => {
          const aiResponse = {
            id: (Date.now() + 1).toString(),
            role: 'assistant' as const,
            content: 'Esta es una respuesta simulada del sistema RAG. En una implementación real, aquí se mostraría la respuesta basada en la normativa bancaria.',
            citations: [
              {
                source: 'MIFID II - Artículo 25',
                url: '#',
                score: 0.95,
              },
              {
                source: 'EBA Guidelines ICT Risk',
                url: '#',
                score: 0.87,
              },
            ],
            createdAt: new Date(),
            tokens: 1234,
          };
          
          addMessage(activeConversation, aiResponse);
          setIsLoading(false);
        }, 1000);
      }
      
      setMessage('');
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex">
      {/* Chat Sidebar */}
      <ChatSidebar />
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="border-b border-border bg-card px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Chat RAG</h2>
              <p className="text-sm text-muted-foreground">
                Consulta inteligente de normativa bancaria
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                  <div className="w-2 h-2 bg-success rounded-full mr-1" />
                  Azure OpenAI
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>~120ms</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-auto p-6 space-y-4">
          {activeConv?.messages.length === 0 || !activeConv ? (
            <div className="flex items-center justify-center h-full">
              <Card className="max-w-md shadow-card">
                <CardHeader className="text-center">
                  <CardTitle>Bienvenido al Chat RAG</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Inicia una conversación para consultar la base de conocimiento regulatoria
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Comandos disponibles:</p>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <div><code className="bg-muted px-1 rounded">/report</code> - Generar reporte</div>
                      <div><code className="bg-muted px-1 rounded">/gap</code> - Análisis GAP</div>
                      <div><code className="bg-muted px-1 rounded">/compare</code> - Comparar normativas</div>
                      <div><code className="bg-muted px-1 rounded">/updates</code> - Últimas novedades</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            activeConv.messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-4 max-w-xs">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="border-t border-border bg-card p-6">
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-2">
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu consulta aquí... (Ctrl/Cmd + Enter para enviar)"
                className="min-h-[100px] resize-none"
                disabled={isLoading}
              />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <span>Ctrl/Cmd + Enter para enviar</span>
                  <Separator orientation="vertical" className="h-3" />
                  <span>/ para comandos</span>
                </div>
                <span>{message.length} caracteres</span>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-10 w-10 p-0"
                disabled={isLoading}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim() || isLoading}
                className="h-10 w-10 p-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}