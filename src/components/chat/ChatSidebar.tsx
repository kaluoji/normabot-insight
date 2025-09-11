import { useState } from 'react';
import { Search, Plus, Pin, MessageSquare, Tag, Calendar, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useChatStore } from '@/lib/store';
import { cn } from '@/lib/utils';

export function ChatSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const { conversations, activeConversation, setActiveConversation, addConversation } = useChatStore();

  const createNewConversation = () => {
    const newConv = {
      id: Date.now().toString(),
      title: 'Nueva Conversación',
      messages: [],
      tags: [],
      updatedAt: new Date(),
      isPinned: false,
    };
    
    addConversation(newConv);
    setActiveConversation(newConv.id);
  };

  const filteredConversations = conversations.filter(conv =>
    conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pinnedConversations = filteredConversations.filter(conv => conv.isPinned);
  const recentConversations = filteredConversations.filter(conv => !conv.isPinned);

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Hoy';
    if (days === 1) return 'Ayer';
    if (days < 7) return `Hace ${days} días`;
    return date.toLocaleDateString();
  };

  const getTags = (tags: string[]) => {
    const colors = ['bg-primary/10 text-primary', 'bg-success/10 text-success', 'bg-warning/10 text-warning'];
    return tags.map((tag, index) => (
      <Badge key={tag} className={`${colors[index % colors.length]} text-xs`}>
        {tag}
      </Badge>
    ));
  };

  return (
    <div className="w-80 border-r border-border bg-card">
      <div className="p-4 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Conversaciones</h3>
          <Button onClick={createNewConversation} size="sm" className="h-8 w-8 p-0">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar conversaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            <Tag className="h-3 w-3 mr-1" />
            MIFID II
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            <Tag className="h-3 w-3 mr-1" />
            Basilea III
          </Badge>
          <Badge variant="outline" className="cursor-pointer hover:bg-muted">
            <Tag className="h-3 w-3 mr-1" />
            ESG
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Conversations List */}
      <div className="flex-1 overflow-auto">
        {/* Pinned Conversations */}
        {pinnedConversations.length > 0 && (
          <div className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Pin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Fijadas</span>
            </div>
            <div className="space-y-2">
              {pinnedConversations.map((conv) => (
                <Card
                  key={conv.id}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-muted/50",
                    activeConversation === conv.id ? "ring-2 ring-primary/20 bg-primary/5" : ""
                  )}
                  onClick={() => setActiveConversation(conv.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{conv.title}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(conv.updatedAt)}
                        </p>
                        {conv.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {getTags(conv.tags.slice(0, 2))}
                            {conv.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{conv.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                      <Pin className="h-3 w-3 text-primary flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {pinnedConversations.length > 0 && <Separator />}

        {/* Recent Conversations */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Recientes</span>
          </div>
          <div className="space-y-2">
            {recentConversations.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No hay conversaciones aún
                  </p>
                  <Button onClick={createNewConversation} variant="outline" size="sm" className="mt-2">
                    Crear primera conversación
                  </Button>
                </CardContent>
              </Card>
            ) : (
              recentConversations.map((conv) => (
                <Card
                  key={conv.id}
                  className={cn(
                    "cursor-pointer transition-colors hover:bg-muted/50",
                    activeConversation === conv.id ? "ring-2 ring-primary/20 bg-primary/5" : ""
                  )}
                  onClick={() => setActiveConversation(conv.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium truncate">{conv.title}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(conv.updatedAt)}
                          <span className="ml-auto">{conv.messages.length} mensajes</span>
                        </p>
                        {conv.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {getTags(conv.tags.slice(0, 2))}
                            {conv.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{conv.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}