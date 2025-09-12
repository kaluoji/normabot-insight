import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Download, FileText, AlertCircle, CheckCircle, XCircle, User, Calendar } from 'lucide-react';
import { GapPairSelector } from '@/components/gap-analysis/GapPairSelector';
import { GapDiffViewer } from '@/components/gap-analysis/GapDiffViewer';
import { GapFindingsTable } from '@/components/gap-analysis/GapFindingsTable';

const mockAnalysis = {
  id: '1',
  normative: 'MiFID II - Art. 25',
  policy: 'Política de Asesoramiento v2.1',
  status: 'completed',
  completedAt: '2024-01-15',
  summary: {
    totalRequirements: 24,
    compliant: 18,
    partiallyCompliant: 4,
    nonCompliant: 2,
    overallScore: 75
  },
  findings: [
    {
      id: '1',
      requirement: 'Evaluación de idoneidad',
      clause: 'Art. 25.2',
      policyReference: 'Sección 4.2',
      status: 'compliant' as const,
      severity: 'low' as const,
      description: 'El proceso de evaluación de idoneidad está correctamente implementado',
      recommendation: 'Mantener procedimientos actuales',
      owner: 'Compliance Team',
      targetDate: '2024-03-01',
      evidence: 'Procedimiento P-ADV-001'
    },
    {
      id: '2',
      requirement: 'Documentación de recomendaciones',
      clause: 'Art. 25.6',
      policyReference: 'Sección 5.1',
      status: 'partial' as const,
      severity: 'medium' as const,
      description: 'La documentación no incluye todos los elementos requeridos',
      recommendation: 'Actualizar formato de documentación para incluir todos los elementos del Art. 25.6',
      owner: 'Operations Team',
      targetDate: '2024-02-15',
      evidence: 'Gap en template T-ADV-002'
    },
    {
      id: '3',
      requirement: 'Registro de comunicaciones',
      clause: 'Art. 25.7',
      policyReference: 'No definido',
      status: 'non_compliant' as const,
      severity: 'high' as const,
      description: 'No existe procedimiento para registro de comunicaciones',
      recommendation: 'Crear procedimiento específico para registro y archivo de comunicaciones',
      owner: 'Legal Team',
      targetDate: '2024-01-30',
      evidence: 'Ausencia total de procedimiento'
    }
  ]
};

export default function GapAnalysis() {
  const [selectedNormative, setSelectedNormative] = useState<string>('mifid2-art25');
  const [selectedPolicy, setSelectedPolicy] = useState<string>('policy-adv-v21');
  const [hasAnalysis, setHasAnalysis] = useState(true);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 dark:text-red-400';
      case 'medium': return 'text-amber-600 dark:text-amber-400';
      case 'low': return 'text-green-600 dark:text-green-400';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'partial': return <AlertCircle className="h-4 w-4 text-amber-600" />;
      case 'non_compliant': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant': return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Conforme</Badge>;
      case 'partial': return <Badge variant="default" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">Parcial</Badge>;
      case 'non_compliant': return <Badge variant="destructive">No Conforme</Badge>;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Análisis GAP</h1>
          <p className="text-muted-foreground mt-1">
            Análisis de brechas entre normativa y políticas internas
          </p>
        </div>
      </div>

      <GapPairSelector
        selectedNormative={selectedNormative}
        selectedPolicy={selectedPolicy}
        onNormativeChange={setSelectedNormative}
        onPolicyChange={setSelectedPolicy}
        onAnalyze={() => setHasAnalysis(true)}
      />

      {hasAnalysis && (
        <>
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Resumen del Análisis
                  </CardTitle>
                  <CardDescription>
                    {mockAnalysis.normative} vs {mockAnalysis.policy}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Exportar CSV
                  </Button>
                  <Button size="sm">
                    Agregar al Reporte
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{mockAnalysis.summary.compliant}</div>
                  <div className="text-sm text-muted-foreground">Conforme</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-600">{mockAnalysis.summary.partiallyCompliant}</div>
                  <div className="text-sm text-muted-foreground">Parcialmente</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{mockAnalysis.summary.nonCompliant}</div>
                  <div className="text-sm text-muted-foreground">No Conforme</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{mockAnalysis.summary.overallScore}%</div>
                  <div className="text-sm text-muted-foreground">Score General</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Cumplimiento General</span>
                  <span>{mockAnalysis.summary.overallScore}%</span>
                </div>
                <Progress value={mockAnalysis.summary.overallScore} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <GapDiffViewer 
            normativeContent="Art. 25.2: Las empresas de inversión deberán obtener información necesaria sobre los conocimientos y la experiencia del cliente..."
            policyContent="Sección 4.2: El asesor deberá evaluar el perfil del cliente mediante cuestionario de idoneidad..."
          />

          <Card>
            <CardHeader>
              <CardTitle>Hallazgos Detallados</CardTitle>
              <CardDescription>
                Lista completa de brechas identificadas y recomendaciones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <GapFindingsTable findings={mockAnalysis.findings} />
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}