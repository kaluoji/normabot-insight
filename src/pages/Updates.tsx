import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, Search, Filter, ExternalLink, Calendar, Tag, Plus, Rss } from 'lucide-react';
import { UpdatesFilterBar } from '@/components/updates/UpdatesFilterBar';
import { UpdateCard } from '@/components/updates/UpdateCard';
import { AlertSubscriptions } from '@/components/updates/AlertSubscriptions';

const mockUpdates = [
  {
    id: '1',
    source: 'ESMA',
    title: 'Guidelines on MiFID II product governance requirements',
    summary: 'ESMA publishes final guidelines on product governance requirements under MiFID II, including new provisions for distribution strategy and target market identification.',
    url: 'https://esma.europa.eu/press-news/esma-news/esma-publishes-guidelines-mifid-ii-product-governance',
    date: '2024-01-15',
    tags: ['MiFID II', 'Product Governance', 'Guidelines'],
    type: 'guideline' as const,
    priority: 'high' as const,
    regulation: 'MiFID II'
  },
  {
    id: '2',
    source: 'EBA',
    title: 'Draft RTS on strong customer authentication',
    summary: 'EBA publishes draft regulatory technical standards on strong customer authentication and secure communication under PSD2.',
    url: 'https://eba.europa.eu/regulation-and-policy/payment-services-and-electronic-money/regulatory-technical-standards-on-strong-customer-authentication',
    date: '2024-01-12',
    tags: ['PSD2', 'SCA', 'Authentication'],
    type: 'rts' as const,
    priority: 'medium' as const,
    regulation: 'PSD2'
  },
  {
    id: '3',
    source: 'ECB',
    title: 'Climate-related and environmental risks supervisory expectations',
    summary: 'ECB updates its expectations regarding the management and disclosure of climate-related and environmental risks for significant institutions.',
    url: 'https://bankingsupervision.europa.eu/press/pr/date/2024/html/ssm.pr240112~1.en.html',
    date: '2024-01-10',
    tags: ['Climate Risk', 'Environmental', 'Supervision'],
    type: 'guidance' as const,
    priority: 'high' as const,
    regulation: 'Climate Risk'
  },
  {
    id: '4',
    source: 'CNMV',
    title: 'Circular sobre requisitos de sostenibilidad en SGIIC',
    summary: 'Nueva circular de la CNMV sobre requisitos de sostenibilidad aplicables a las sociedades gestoras de instituciones de inversión colectiva.',
    url: 'https://cnmv.es/portal/verDoc.axd?t={circular-requisitos-sostenibilidad}',
    date: '2024-01-08',
    tags: ['Sostenibilidad', 'SGIIC', 'ESG'],
    type: 'circular' as const,
    priority: 'medium' as const,
    regulation: 'CNMV'
  },
  {
    id: '5',
    source: 'BdE',
    title: 'Guía sobre gestión del riesgo de modelo',
    summary: 'El Banco de España publica una guía sobre las mejores prácticas para la gestión del riesgo de modelo en entidades de crédito.',
    url: 'https://bde.es/f/webbde/GAP/Secciones/SalaPrensa/NotasInformativas/24/guia-riesgo-modelo.pdf',
    date: '2024-01-05',
    tags: ['Riesgo de Modelo', 'Gestión de Riesgos', 'Metodología'],
    type: 'guide' as const,
    priority: 'medium' as const,
    regulation: 'Riesgo de Modelo'
  }
];

export default function Updates() {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedForReport, setSelectedForReport] = useState<string[]>([]);

  const filteredUpdates = mockUpdates.filter(update => {
    const matchesSearch = update.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         update.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSource = selectedSources.length === 0 || selectedSources.includes(update.source);
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => update.tags.includes(tag));
    
    return matchesSearch && matchesSource && matchesTags;
  });

  const handleSelectForReport = (updateId: string) => {
    setSelectedForReport(prev => 
      prev.includes(updateId) 
        ? prev.filter(id => id !== updateId)
        : [...prev, updateId]
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Novedades Normativas</h1>
          <p className="text-muted-foreground mt-1">
            Últimas actualizaciones regulatorias de organismos supervisores
          </p>
        </div>
        <div className="flex gap-2">
          {selectedForReport.length > 0 && (
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Crear Reporte ({selectedForReport.length})
            </Button>
          )}
          <Button className="gap-2">
            <Rss className="h-4 w-4" />
            Configurar Alertas
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feed">Feed de Novedades</TabsTrigger>
          <TabsTrigger value="subscriptions">Suscripciones</TabsTrigger>
          <TabsTrigger value="analytics">Analíticas</TabsTrigger>
        </TabsList>

        <TabsContent value="feed" className="space-y-6">
          <UpdatesFilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedSources={selectedSources}
            onSourcesChange={setSelectedSources}
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />

          <div className="grid gap-4">
            {filteredUpdates.map((update) => (
              <UpdateCard 
                key={update.id} 
                update={update}
                isSelected={selectedForReport.includes(update.id)}
                onSelect={() => handleSelectForReport(update.id)}
              />
            ))}
          </div>

          {filteredUpdates.length === 0 && (
            <Card>
              <CardContent className="py-12 text-center">
                <div className="text-muted-foreground">
                  No se encontraron novedades con los filtros aplicados
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-6">
          <AlertSubscriptions />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Novedades Mes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">+15% vs mes anterior</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Alta Prioridad
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">25% del total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Organismos Activos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">ESMA, EBA, ECB lideran</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Áreas Principales
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">ESG</div>
                <p className="text-xs text-muted-foreground">Área más activa</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tendencias por Organismo</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {['ESMA', 'EBA', 'ECB', 'CNMV', 'BdE'].map((source) => (
                  <div key={source} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{source}</Badge>
                      <span className="text-sm">
                        {source === 'ESMA' ? '12 publicaciones' :
                         source === 'EBA' ? '8 publicaciones' :
                         source === 'ECB' ? '6 publicaciones' :
                         source === 'CNMV' ? '4 publicaciones' : '2 publicaciones'}
                      </span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {source === 'ESMA' ? '+20%' :
                       source === 'EBA' ? '+10%' :
                       source === 'ECB' ? '+5%' :
                       source === 'CNMV' ? '0%' : '-10%'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}