import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Trash2, Edit, Bell, BellOff } from 'lucide-react';

interface AlertCardProps {
  alert: {
    id: string;
    title: string;
    description: string;
    isActive: boolean;
    frequency: string;
    channels: string[];
    keywords: string[];
    sources: string[];
    lastTriggered: string | null;
    triggeredCount: number;
  };
  onToggle: () => void;
  onDelete: () => void;
}

export function AlertCard({ alert, onToggle, onDelete }: AlertCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              {alert.isActive ? (
                <Bell className="h-5 w-5 text-green-600" />
              ) : (
                <BellOff className="h-5 w-5 text-muted-foreground" />
              )}
              <h3 className="font-semibold">{alert.title}</h3>
              <Badge variant={alert.isActive ? 'default' : 'secondary'}>
                {alert.isActive ? 'Activa' : 'Inactiva'}
              </Badge>
            </div>

            <p className="text-muted-foreground">{alert.description}</p>

            <div className="flex flex-wrap gap-2">
              {alert.keywords.map((keyword) => (
                <Badge key={keyword} variant="outline" className="text-xs">
                  {keyword}
                </Badge>
              ))}
            </div>

            <div className="text-sm text-muted-foreground">
              {alert.triggeredCount} activaciones • 
              Frecuencia: {alert.frequency} • 
              Canales: {alert.channels.join(', ')}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Switch checked={alert.isActive} onCheckedChange={onToggle} />
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}