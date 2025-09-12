import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, Globe, Download, Filter } from 'lucide-react';
import { JurisdictionFilters } from '@/components/comparatives/JurisdictionFilters';
import { ComparativeTable } from '@/components/comparatives/ComparativeTable';
import { RadarDifferencesChart } from '@/components/comparatives/RadarDifferencesChart';

const mockComparative = {
  jurisdictions: ['ES', 'FR', 'DE', 'UK', 'US'],
  topics: ['solvency', 'liquidity', 'conduct', 'esg'],
  data: [
    {
      requirement: 'Capital Mínimo Regulatorio',
      topic: 'solvency',
      ES: { status: 'implemented', value: '8%', notes: 'CRR/CRD IV' },
      FR: { status: 'implemented', value: '8%', notes: 'CRR/CRD IV' },
      DE: { status: 'implemented', value: '8%', notes: 'CRR/CRD IV' },
      UK: { status: 'divergent', value: '4.5%', notes: 'Post-Brexit framework' },
      US: { status: 'different', value: '4%', notes: 'Basel III US implementation' }
    },
    {
      requirement: 'Ratio de Liquidez (LCR)',
      topic: 'liquidity',
      ES: { status: 'implemented', value: '100%', notes: 'CRR Art. 412' },
      FR: { status: 'implemented', value: '100%', notes: 'CRR Art. 412' },
      DE: { status: 'implemented', value: '100%', notes: 'CRR Art. 412' },
      UK: { status: 'implemented', value: '100%', notes: 'PRA rules' },
      US: { status: 'different', value: '100%', notes: 'US LCR rule' }
    },
    {
      requirement: 'Protección al Inversor',
      topic: 'conduct',
      ES: { status: 'implemented', value: '€20k', notes: 'MiFID II' },
      FR: { status: 'implemented', value: '€70k', notes: 'FGDR' },
      DE: { status: 'implemented', value: '€100k', notes: 'EdB' },
      UK: { status: 'divergent', value: '£85k', notes: 'FSCS' },
      US: { status: 'different', value: '$250k', notes: 'SIPC' }
    },
    {
      requirement: 'Divulgación Climática',
      topic: 'esg',
      ES: { status: 'proposed', value: 'Q2 2024', notes: 'CSRD implementation' },
      FR: { status: 'implemented', value: 'Q1 2024', notes: 'Article 173' },
      DE: { status: 'proposed', value: 'Q3 2024', notes: 'Sustainable Finance' },
      UK: { status: 'different', value: '2025', notes: 'TCFD mandatory' },
      US: { status: 'voluntary', value: 'Voluntary', notes: 'SEC climate rules delayed' }
    }
  ]
};

export default function Comparatives() {
  const [selectedJurisdictions, setSelectedJurisdictions] = useState(['ES', 'FR', 'DE', 'UK']);
  const [selectedTopics, setSelectedTopics] = useState(['solvency', 'liquidity']);
  const [activeTab, setActiveTab] = useState('table');

  const filteredData = mockComparative.data.filter(item => 
    selectedTopics.includes(item.topic)
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Comparativas Jurisdiccionales</h1>
          <p className="text-muted-foreground mt-1">
            Análisis comparativo de regulación entre jurisdicciones
          </p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Exportar Reporte
        </Button>
      </div>

      <JurisdictionFilters
        selectedJurisdictions={selectedJurisdictions}
        selectedTopics={selectedTopics}
        onJurisdictionsChange={setSelectedJurisdictions}
        onTopicsChange={setSelectedTopics}
      />

      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Análisis Comparativo
              </CardTitle>
              <CardDescription>
                {selectedJurisdictions.length} jurisdicciones • {selectedTopics.length} áreas regulatorias
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline">{filteredData.length} requisitos</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="table">Vista Tabla</TabsTrigger>
              <TabsTrigger value="chart">Vista Gráfica</TabsTrigger>
            </TabsList>

            <TabsContent value="table" className="mt-6">
              <ComparativeTable 
                data={filteredData}
                jurisdictions={selectedJurisdictions}
              />
            </TabsContent>

            <TabsContent value="chart" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RadarDifferencesChart 
                  data={filteredData}
                  jurisdictions={selectedJurisdictions}
                />
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Insights Clave</h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">Convergencia Europea</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                        ES, FR y DE muestran alta alineación en regulación de solvencia y liquidez
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800">
                      <h4 className="font-medium text-amber-900 dark:text-amber-100">Divergencia Post-Brexit</h4>
                      <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                        UK muestra diferencias significativas en marcos de capital
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800">
                      <h4 className="font-medium text-green-900 dark:text-green-100">Liderazgo en ESG</h4>
                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                        FR adelanta en implementación de divulgación climática
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}