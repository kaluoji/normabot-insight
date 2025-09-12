import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, FileText, Building, Search } from 'lucide-react';

interface GapPairSelectorProps {
  selectedNormative: string;
  selectedPolicy: string;
  onNormativeChange: (value: string) => void;
  onPolicyChange: (value: string) => void;
  onAnalyze: () => void;
}

const mockNormatives = [
  { id: 'mifid2-art25', name: 'MiFID II - Art. 25', description: 'Requisitos de asesoramiento e idoneidad' },
  { id: 'solvencia2-pillar3', name: 'Solvencia II - Pilar 3', description: 'Divulgación pública' },
  { id: 'dora-ict', name: 'DORA - ICT Risk', description: 'Gestión de riesgo tecnológico' },
  { id: 'psd2-sca', name: 'PSD2 - SCA', description: 'Autenticación reforzada' }
];

const mockPolicies = [
  { id: 'policy-adv-v21', name: 'Política de Asesoramiento v2.1', description: 'Procedimientos de asesoramiento al cliente' },
  { id: 'policy-tech-v15', name: 'Política Tecnológica v1.5', description: 'Gestión de riesgos tecnológicos' },
  { id: 'policy-risk-v30', name: 'Política de Riesgos v3.0', description: 'Marco general de gestión de riesgos' },
  { id: 'policy-data-v12', name: 'Política de Datos v1.2', description: 'Protección y privacidad de datos' }
];

export function GapPairSelector({ 
  selectedNormative, 
  selectedPolicy, 
  onNormativeChange, 
  onPolicyChange, 
  onAnalyze 
}: GapPairSelectorProps) {
  const selectedNormativeData = mockNormatives.find(n => n.id === selectedNormative);
  const selectedPolicyData = mockPolicies.find(p => p.id === selectedPolicy);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Selección de Elementos a Comparar
        </CardTitle>
        <CardDescription>
          Elige la normativa y política interna para realizar el análisis GAP
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Normativa</h3>
            </div>
            <Select value={selectedNormative} onValueChange={onNormativeChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar normativa..." />
              </SelectTrigger>
              <SelectContent>
                {mockNormatives.map((normative) => (
                  <SelectItem key={normative.id} value={normative.id}>
                    <div className="flex flex-col">
                      <div className="font-medium">{normative.name}</div>
                      <div className="text-sm text-muted-foreground">{normative.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedNormativeData && (
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="font-medium text-blue-900 dark:text-blue-100">
                  {selectedNormativeData.name}
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  {selectedNormativeData.description}
                </div>
                <Badge variant="outline" className="mt-2">
                  Normativa Externa
                </Badge>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Política Interna</h3>
            </div>
            <Select value={selectedPolicy} onValueChange={onPolicyChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccionar política..." />
              </SelectTrigger>
              <SelectContent>
                {mockPolicies.map((policy) => (
                  <SelectItem key={policy.id} value={policy.id}>
                    <div className="flex flex-col">
                      <div className="font-medium">{policy.name}</div>
                      <div className="text-sm text-muted-foreground">{policy.description}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedPolicyData && (
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="font-medium text-green-900 dark:text-green-100">
                  {selectedPolicyData.name}
                </div>
                <div className="text-sm text-green-700 dark:text-green-300 mt-1">
                  {selectedPolicyData.description}
                </div>
                <Badge variant="outline" className="mt-2">
                  Política Interna
                </Badge>
              </div>
            )}
          </div>
        </div>

        {selectedNormative && selectedPolicy && (
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="text-sm font-medium">
                {selectedNormativeData?.name}
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
              <div className="text-sm font-medium">
                {selectedPolicyData?.name}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button 
            onClick={onAnalyze}
            disabled={!selectedNormative || !selectedPolicy}
            className="gap-2"
            size="lg"
          >
            <Search className="h-4 w-4" />
            Ejecutar Análisis GAP
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}