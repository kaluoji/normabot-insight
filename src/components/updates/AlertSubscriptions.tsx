import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Bell, Settings } from 'lucide-react';

export function AlertSubscriptions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Configurar Suscripciones
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">ESMA - Guidelines</div>
              <div className="text-sm text-muted-foreground">
                Notificaciones sobre nuevas guidelines de ESMA
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">EBA - Consultas Públicas</div>
              <div className="text-sm text-muted-foreground">
                Alertas sobre consultas públicas de EBA
              </div>
            </div>
            <Switch defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">CNMV - Circulares</div>
              <div className="text-sm text-muted-foreground">
                Novedades sobre circulares de CNMV
              </div>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}