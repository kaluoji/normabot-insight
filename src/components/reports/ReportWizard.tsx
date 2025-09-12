import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { ChevronLeft, ChevronRight, FileText, Upload, Eye, Download, X } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ReportWizardProps {
  onClose: () => void;
}

const mockSections = [
  { id: 'executive', name: 'Resumen Ejecutivo', description: 'Síntesis de alto nivel para la dirección' },
  { id: 'impacts', name: 'Principales Impactos', description: 'Análisis de impactos operativos y estratégicos' },
  { id: 'novelties', name: 'Novedades Destacadas', description: 'Cambios más relevantes identificados' },
  { id: 'areas', name: 'Áreas Afectadas', description: 'Departamentos y procesos impactados' },
  { id: 'conclusions', name: 'Conclusiones', description: 'Recomendaciones y próximos pasos' }
];

export function ReportWizard({ onClose }: ReportWizardProps) {
  const [step, setStep] = useState(1);
  const [reportData, setReportData] = useState({
    title: '',
    source: 'normative',
    selectedNormative: '',
    uploadedFiles: [] as string[],
    structure: ['executive', 'impacts', 'novelties'],
    promptExtra: ''
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleGenerate = () => {
    // Simular generación de reporte
    console.log('Generating report with data:', reportData);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Crear Nuevo Reporte</h2>
          <p className="text-muted-foreground">
            Asistente para generar reportes normativos personalizados
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Paso {step} de 3
          </div>
          <Progress value={(step / 3) * 100} className="w-32" />
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Selección de Fuentes
              </CardTitle>
              <CardDescription>
                Elige la normativa o sube documentos para analizar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="title">Título del Reporte</Label>
                <Input
                  id="title"
                  placeholder="Ej: Análisis MiFID II - Q1 2024"
                  value={reportData.title}
                  onChange={(e) => setReportData(prev => ({ ...prev, title: e.target.value }))}
                />
              </div>

              <div className="space-y-4">
                <Label>Fuente de Datos</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer transition-colors ${
                      reportData.source === 'normative' ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setReportData(prev => ({ ...prev, source: 'normative' }))}
                  >
                    <CardContent className="p-4 text-center">
                      <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="font-medium">Base de Conocimiento</div>
                      <div className="text-sm text-muted-foreground">
                        Usar normativa existente
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    className={`cursor-pointer transition-colors ${
                      reportData.source === 'upload' ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setReportData(prev => ({ ...prev, source: 'upload' }))}
                  >
                    <CardContent className="p-4 text-center">
                      <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
                      <div className="font-medium">Subir Documentos</div>
                      <div className="text-sm text-muted-foreground">
                        Cargar archivos propios
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {reportData.source === 'normative' && (
                <div className="space-y-4">
                  <Label>Seleccionar Normativa</Label>
                  <div className="space-y-2">
                    {['MiFID II', 'Solvencia II', 'DORA', 'PSD2', 'GDPR'].map((norm) => (
                      <div
                        key={norm}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          reportData.selectedNormative === norm ? 'bg-primary/10 border-primary' : 'hover:bg-muted/50'
                        }`}
                        onClick={() => setReportData(prev => ({ ...prev, selectedNormative: norm }))}
                      >
                        <div className="font-medium">{norm}</div>
                        <div className="text-sm text-muted-foreground">
                          {norm === 'MiFID II' ? 'Markets in Financial Instruments Directive' :
                           norm === 'Solvencia II' ? 'Solvency II Directive' :
                           norm === 'DORA' ? 'Digital Operational Resilience Act' :
                           norm === 'PSD2' ? 'Payment Services Directive 2' :
                           'General Data Protection Regulation'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {reportData.source === 'upload' && (
                <div className="space-y-4">
                  <Label>Subir Documentos</Label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-4" />
                    <div className="text-lg font-medium mb-2">Arrastra archivos aquí</div>
                    <div className="text-muted-foreground mb-4">
                      O haz clic para seleccionar archivos
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Formatos soportados: PDF, DOCX, TXT (Max. 10MB)
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Estructura del Reporte
              </CardTitle>
              <CardDescription>
                Selecciona las secciones que quieres incluir
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {mockSections.map((section) => (
                  <div
                    key={section.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      reportData.structure.includes(section.id) 
                        ? 'bg-primary/10 border-primary' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => {
                      const newStructure = reportData.structure.includes(section.id)
                        ? reportData.structure.filter(s => s !== section.id)
                        : [...reportData.structure, section.id];
                      setReportData(prev => ({ ...prev, structure: newStructure }));
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{section.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {section.description}
                        </div>
                      </div>
                      {reportData.structure.includes(section.id) && (
                        <Badge variant="default">Incluido</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <Label htmlFor="prompt-extra">Instrucciones Adicionales (Opcional)</Label>
                <Textarea
                  id="prompt-extra"
                  placeholder="Ej: Enfócate en los cambios operativos y tecnológicos..."
                  value={reportData.promptExtra}
                  onChange={(e) => setReportData(prev => ({ ...prev, promptExtra: e.target.value }))}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Previsualización
              </CardTitle>
              <CardDescription>
                Revisa la configuración antes de generar el reporte
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Título</Label>
                  <div className="font-medium">{reportData.title || 'Sin título'}</div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Fuente</Label>
                  <div className="font-medium">
                    {reportData.source === 'normative' 
                      ? `Normativa: ${reportData.selectedNormative || 'No seleccionada'}`
                      : 'Documentos subidos'
                    }
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-muted-foreground">
                    Secciones ({reportData.structure.length})
                  </Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {reportData.structure.map((sectionId) => {
                      const section = mockSections.find(s => s.id === sectionId);
                      return (
                        <Badge key={sectionId} variant="outline">
                          {section?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>

                {reportData.promptExtra && (
                  <div>
                    <Label className="text-sm font-medium text-muted-foreground">
                      Instrucciones Adicionales
                    </Label>
                    <div className="text-sm bg-muted p-3 rounded-lg mt-1">
                      {reportData.promptExtra}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                  Tiempo estimado de generación
                </div>
                <div className="text-sm text-blue-700 dark:text-blue-300">
                  3-5 minutos aproximadamente
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={step === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Anterior
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            {step < 3 ? (
              <Button onClick={handleNext} className="gap-2">
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleGenerate} className="gap-2">
                <FileText className="h-4 w-4" />
                Generar Reporte
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}