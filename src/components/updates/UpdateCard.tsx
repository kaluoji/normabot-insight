import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ExternalLink, Calendar, Tag } from 'lucide-react';

interface UpdateCardProps {
  update: {
    id: string;
    source: string;
    title: string;
    summary: string;
    url: string;
    date: string;
    tags: string[];
    type: string;
    priority: string;
    regulation: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export function UpdateCard({ update, isSelected, onSelect }: UpdateCardProps) {
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return <Badge variant="destructive">Alta</Badge>;
      case 'medium': return <Badge className="bg-amber-100 text-amber-800">Media</Badge>;
      case 'low': return <Badge variant="outline">Baja</Badge>;
      default: return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeMap: { [key: string]: string } = {
      guideline: 'Guideline',
      rts: 'RTS',
      guidance: 'Guidance',
      circular: 'Circular',
      guide: 'Guía'
    };
    return <Badge variant="outline">{typeMap[type] || type}</Badge>;
  };

  return (
    <Card className={`transition-colors ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Checkbox 
            checked={isSelected}
            onCheckedChange={onSelect}
            className="mt-1"
          />
          
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="default">{update.source}</Badge>
                  {getPriorityBadge(update.priority)}
                  {getTypeBadge(update.type)}
                </div>
                <h3 className="font-semibold text-lg leading-tight">
                  {update.title}
                </h3>
              </div>
              <Button variant="ghost" size="icon" asChild>
                <a href={update.url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {update.summary}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {update.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {new Date(update.date).toLocaleDateString('es-ES')}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}