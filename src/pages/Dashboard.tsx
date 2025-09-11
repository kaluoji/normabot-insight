import { TrendingUp, FileText, AlertTriangle, CheckCircle, Clock, Users, MessageSquare, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

const kpiData = [
  {
    title: 'Consultas RAG Este Mes',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: MessageSquare,
    description: 'vs. mes anterior',
    color: 'bg-primary/10',
  },
  {
    title: 'Reportes Generados',
    value: '156',
    change: '+8.2%',
    trend: 'up',
    icon: FileText,
    description: 'este mes',
    color: 'bg-success/10',
  },
  {
    title: 'Gaps Identificados',
    value: '23',
    change: '-15.3%',
    trend: 'down',
    icon: AlertTriangle,
    description: 'vs. mes anterior',
    color: 'bg-warning/10',
  },
  {
    title: 'Cumplimiento Global',
    value: '94.2%',
    change: '+2.1%',
    trend: 'up',
    icon: CheckCircle,
    description: 'promedio ponderado',
    color: 'bg-success/10',
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'report',
    title: 'Análisis MIFID II - Q3 2024',
    description: 'Reporte de cumplimiento generado',
    time: 'Hace 2 horas',
    status: 'completed',
  },
  {
    id: 2,
    type: 'gap',
    title: 'GAP Analysis: Basilea III vs. Política Interna',
    description: '5 gaps críticos identificados',
    time: 'Hace 4 horas',
    status: 'attention',
  },
  {
    id: 3,
    type: 'update',
    title: 'Nueva normativa EBA',
    description: 'Guidelines on ICT Risk Management',
    time: 'Hace 1 día',
    status: 'new',
  },
  {
    id: 4,
    type: 'chat',
    title: 'Consulta sobre requisitos ESG',
    description: 'Chat RAG con 15 mensajes',
    time: 'Hace 2 días',
    status: 'completed',
  },
];

const quickActions = [
  {
    title: 'Nuevo Chat RAG',
    description: 'Consulta la base de conocimiento regulatoria',
    icon: MessageSquare,
    href: '/chat',
    color: 'bg-primary',
  },
  {
    title: 'Generar Reporte',
    description: 'Crea un reporte de cumplimiento',
    icon: FileText,
    href: '/reports',
    color: 'bg-success',
  },
  {
    title: 'Análisis GAP',
    description: 'Compara normativa vs. políticas internas',
    icon: BarChart3,
    href: '/gap-analysis',
    color: 'bg-warning',
  },
  {
    title: 'Ver Novedades',
    description: 'Últimas actualizaciones regulatorias',
    icon: TrendingUp,
    href: '/updates',
    color: 'bg-destructive',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-success/10 text-success border-success/20';
      case 'attention': return 'bg-warning/10 text-warning border-warning/20';
      case 'new': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'attention': return 'Atención';
      case 'new': return 'Nuevo';
      default: return 'Pendiente';
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard Regulatorio</h1>
        <p className="text-muted-foreground mt-2">
          Monitorea el cumplimiento y gestiona la inteligencia regulatoria
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="shadow-card hover-glow transition-all">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${kpi.color || 'bg-primary/10'}`}>
                <kpi.icon className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <span className={`inline-flex items-center ${
                  kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  {kpi.change}
                </span>
                <span className="ml-1">{kpi.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="lg:col-span-1 shadow-card">
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>
              Accede a las funciones principales de la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full justify-start h-auto p-4 hover-lift"
                onClick={() => navigate(action.href)}
              >
                <div className={`p-2 rounded-lg mr-3 ${action.color}`}>
                  <action.icon className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="lg:col-span-2 shadow-card">
          <CardHeader>
            <CardTitle>Actividad Reciente</CardTitle>
            <CardDescription>
              Últimas acciones y eventos en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      {activity.type === 'report' && <FileText className="h-4 w-4 text-primary" />}
                      {activity.type === 'gap' && <BarChart3 className="h-4 w-4 text-primary" />}
                      {activity.type === 'update' && <TrendingUp className="h-4 w-4 text-primary" />}
                      {activity.type === 'chat' && <MessageSquare className="h-4 w-4 text-primary" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <Badge className={getStatusColor(activity.status)}>
                        {getStatusLabel(activity.status)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Compliance Overview */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle>Resumen de Cumplimiento</CardTitle>
          <CardDescription>
            Estado actual por áreas regulatorias principales
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">MIFID II</span>
                <span className="text-sm text-muted-foreground">96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Basilea III</span>
                <span className="text-sm text-muted-foreground">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">GDPR</span>
                <span className="text-sm text-muted-foreground">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}