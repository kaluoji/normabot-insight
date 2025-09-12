import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, BellRing, Settings, Trash2, Edit, Plus, Mail, Smartphone, Clock } from 'lucide-react';
import { AlertCard } from '@/components/alerts/AlertCard';
import { CreateAlertDialog } from '@/components/alerts/CreateAlertDialog';

const mockAlerts = [
  {
    id: '1',
    title: 'Nuevas Guidelines MiFID II',
    description: 'Notificar cuando ESMA publique nuevas guidelines relacionadas con MiFID II',
    isActive: true,
    frequency: 'immediate' as const,
    channels: ['email', 'browser'] as const,
    keywords: ['MiFID II', 'guidelines', 'ESMA'],
    sources: ['ESMA'],
    lastTriggered: '2024-01-15T10:30:00Z',
    triggeredCount: 3
  },
  {
    id: '2',
    title: 'Actualizaciones Solvencia II',
    description: 'Monitorear cambios en regulación de Solvencia II de EIOPA',
    isActive: true,
    frequency: 'daily' as const,
    channels: ['email'] as const,
    keywords: ['Solvencia II', 'EIOPA', 'pillar'],
    sources: ['EIOPA', 'ECB'],
    lastTriggered: '2024-01-12T08:00:00Z',
    triggeredCount: 7
  },
  {
    id: '3',
    title: 'Riesgo Climático - Divulgación',
    description: 'Alertas sobre nuevos requisitos de divulgación de riesgo climático',
    isActive: false,
    frequency: 'weekly' as const,
    channels: ['email', 'browser'] as const,
    keywords: ['climate risk', 'disclosure', 'ESG'],
    sources: ['ECB', 'EBA', 'ESMA'],
    lastTriggered: '2024-01-08T16:45:00Z',
    triggeredCount: 12
  },
  {
    id: '4',
    title: 'Normativa Española - CNMV',
    description: 'Monitoreo de circulares y consultas públicas de CNMV',
    isActive: true,
    frequency: 'immediate' as const,
    channels: ['browser'] as const,
    keywords: ['circular', 'consulta pública', 'CNMV'],
    sources: ['CNMV'],
    lastTriggered: null,
    triggeredCount: 0
  }
];

const mockNotifications = [
  {
    id: '1',
    title: 'ESMA publica guidelines sobre product governance',
    description: 'Nueva publicación de ESMA sobre requisitos de governance de productos bajo MiFID II',
    timestamp: '2024-01-15T10:30:00Z',
    isRead: false,
    priority: 'high' as const,
    source: 'ESMA',
    alertId: '1'
  },
  {
    id: '2',
    title: 'EBA consulta sobre operational resilience',
    description: 'EBA abre consulta pública sobre guidelines de resilencia operacional',
    timestamp: '2024-01-14T14:20:00Z',
    isRead: true,
    priority: 'medium' as const,
    source: 'EBA',
    alertId: '2'
  },
  {
    id: '3',
    title: 'CNMV circular sobre sostenibilidad en SGIIC',
    description: 'Nueva circular sobre requisitos de sostenibilidad para sociedades gestoras',
    timestamp: '2024-01-12T09:15:00Z',
    isRead: true,
    priority: 'medium' as const,
    source: 'CNMV',
    alertId: '4'
  }
];

export default function Alerts() {
  const [activeTab, setActiveTab] = useState('alerts');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  const handleToggleAlert = (alertId: string) => {
    // Implementar toggle de alerta
    console.log('Toggle alert:', alertId);
  };

  const handleDeleteAlert = (alertId: string) => {
    // Implementar eliminación de alerta
    console.log('Delete alert:', alertId);
  };

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Sistema de Alertas</h1>
          <p className="text-muted-foreground mt-1">
            Configura alertas automáticas para novedades normativas
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Badge variant="destructive" className="mr-2">
              {unreadCount} sin leer
            </Badge>
          )}
          <Button onClick={() => setShowCreateDialog(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Alerta
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="alerts">Mis Alertas</TabsTrigger>
          <TabsTrigger value="notifications" className="relative">
            Notificaciones
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-6">
          <div className="grid gap-4">
            {mockAlerts.map((alert) => (
              <AlertCard
                key={alert.id}
                alert={alert}
                onToggle={() => handleToggleAlert(alert.id)}
                onDelete={() => handleDeleteAlert(alert.id)}
              />
            ))}
          </div>

          {mockAlerts.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <div className="text-lg font-medium mb-2">No tienes alertas configuradas</div>
                <div className="text-muted-foreground mb-4">
                  Crea tu primera alerta para recibir notificaciones automáticas
                </div>
                <Button onClick={() => setShowCreateDialog(true)}>
                  Crear Primera Alerta
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Notificaciones Recientes</h3>
            <Button variant="outline" size="sm">
              Marcar todo como leído
            </Button>
          </div>

          <div className="space-y-3">
            {mockNotifications.map((notification) => (
              <Card key={notification.id} className={`cursor-pointer transition-colors ${
                !notification.isRead ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{notification.source}</Badge>
                        <Badge variant={notification.priority === 'high' ? 'destructive' : 'secondary'}>
                          {notification.priority === 'high' ? 'Alta' : notification.priority === 'medium' ? 'Media' : 'Baja'}
                        </Badge>
                        {!notification.isRead && (
                          <Badge variant="default" className="bg-blue-600">
                            Nuevo
                          </Badge>
                        )}
                      </div>
                      <h4 className="font-medium mb-1">{notification.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {new Date(notification.timestamp).toLocaleString('es-ES')}
                      </div>
                    </div>
                    <BellRing className={`h-5 w-5 ${
                      !notification.isRead ? 'text-blue-600' : 'text-muted-foreground'
                    }`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Configuración General
              </CardTitle>
              <CardDescription>
                Configura las preferencias globales de notificaciones
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notificaciones por Email</div>
                    <div className="text-sm text-muted-foreground">
                      Recibir alertas en tu email registrado
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Notificaciones del Navegador</div>
                    <div className="text-sm text-muted-foreground">
                      Mostrar notificaciones push en el navegador
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Resumen Diario</div>
                    <div className="text-sm text-muted-foreground">
                      Recibir un resumen diario de novedades
                    </div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Resumen Semanal</div>
                    <div className="text-sm text-muted-foreground">
                      Recibir un resumen semanal de actividad regulatoria
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Canales de Notificación</CardTitle>
              <CardDescription>
                Configura dónde y cómo quieres recibir las alertas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Mail className="h-5 w-5 text-primary" />
                    <div className="font-medium">Email</div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    demo@banco.com
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="p-4 border rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="h-5 w-5 text-primary" />
                    <div className="font-medium">Push Notifications</div>
                  </div>
                  <div className="text-sm text-muted-foreground mb-3">
                    Navegador web
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {showCreateDialog && (
        <CreateAlertDialog
          open={showCreateDialog}
          onClose={() => setShowCreateDialog(false)}
        />
      )}
    </div>
  );
}