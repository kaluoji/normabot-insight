import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, Search, Plus, Filter, Calendar, User, Tag } from 'lucide-react';
import { ReportWizard } from '@/components/reports/ReportWizard';
import { ReportCard } from '@/components/reports/ReportCard';

const mockReports = [
  {
    id: '1',
    title: 'Análisis MiFID II - Q4 2024',
    description: 'Evaluación completa del cumplimiento de MiFID II',
    status: 'completed' as const,
    createdAt: '2024-01-15',
    author: 'María González',
    tags: ['MiFID II', 'Conducta', 'Quarterly'],
    type: 'regulatory'
  },
  {
    id: '2',
    title: 'Reporte Solvencia II - Pilar 3',
    description: 'Informe trimestral de divulgación pública',
    status: 'draft' as const,
    createdAt: '2024-01-10',
    author: 'Carlos Ruiz',
    tags: ['Solvencia II', 'Pilar 3', 'Disclosure'],
    type: 'compliance'
  },
  {
    id: '3',
    title: 'Análisis DORA - Preparación',
    description: 'Assessment de preparación para DORA',
    status: 'in_progress' as const,
    createdAt: '2024-01-08',
    author: 'Ana Martín',
    tags: ['DORA', 'Operational Risk', 'Digital'],
    type: 'assessment'
  }
];

export default function Reports() {
  const [activeTab, setActiveTab] = useState('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [showWizard, setShowWizard] = useState(false);

  const filteredReports = mockReports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (showWizard) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <ReportWizard onClose={() => setShowWizard(false)} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reportes Normativos</h1>
          <p className="text-muted-foreground mt-1">
            Genera y gestiona reportes de cumplimiento normativo
          </p>
        </div>
        <Button 
          onClick={() => setShowWizard(true)}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Crear Reporte
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="list">Lista de Reportes</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>

        <TabsContent value="list" className="space-y-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar reportes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredReports.map((report) => (
              <ReportCard key={report.id} report={report} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Reporte Estándar
                </CardTitle>
                <CardDescription>
                  Plantilla básica para reportes de cumplimiento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="secondary">Más usado</Badge>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Reporte Ejecutivo
                </CardTitle>
                <CardDescription>
                  Resumen ejecutivo para alta dirección
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Ejecutivo</Badge>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Reporte Técnico
                </CardTitle>
                <CardDescription>
                  Análisis técnico detallado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Badge variant="outline">Técnico</Badge>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Reportes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">+12% vs mes anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Completados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">75% tasa completación</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  En Proceso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">Promedio 3 días</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Borradores
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2</div>
                <p className="text-xs text-muted-foreground">Requieren revisión</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}