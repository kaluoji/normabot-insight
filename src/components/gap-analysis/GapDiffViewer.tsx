import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Building, GitCompare } from 'lucide-react';

interface GapDiffViewerProps {
  normativeContent: string;
  policyContent: string;
}

export function GapDiffViewer({ normativeContent, policyContent }: GapDiffViewerProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-primary" />
          Comparación Semántica
        </CardTitle>
        <CardDescription>
          Vista lado a lado con resaltado de diferencias y coincidencias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-600" />
              <h3 className="font-semibold">Normativa</h3>
              <Badge variant="outline" className="text-blue-600 border-blue-600">
                Fuente Externa
              </Badge>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="text-sm leading-relaxed">
                <span className="bg-green-200 dark:bg-green-900/40 px-1 rounded">
                  Art. 25.2: Las empresas de inversión deberán obtener información necesaria sobre los 
                </span>
                <span className="bg-green-200 dark:bg-green-900/40 px-1 rounded">
                  conocimientos y la experiencia del cliente
                </span>
                <span className="text-blue-900 dark:text-blue-100">
                  {' '}en el ámbito de inversión correspondiente al tipo específico de producto o servicio, 
                  su situación financiera, incluida su capacidad para soportar pérdidas, y sus objetivos 
                  de inversión, incluida su tolerancia al riesgo.
                </span>
                <span className="bg-red-200 dark:bg-red-900/40 px-1 rounded">
                  {' '}Las empresas deberán documentar toda la información obtenida.
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-green-600" />
              <h3 className="font-semibold">Política Interna</h3>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Documento Interno
              </Badge>
            </div>
            <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="text-sm leading-relaxed">
                <span className="text-green-900 dark:text-green-100">
                  Sección 4.2: El asesor deberá evaluar el perfil del cliente mediante 
                </span>
                <span className="bg-amber-200 dark:bg-amber-900/40 px-1 rounded">
                  cuestionario de idoneidad
                </span>
                <span className="text-green-900 dark:text-green-100">
                  {' '}que incluirá preguntas sobre 
                </span>
                <span className="bg-green-200 dark:bg-green-900/40 px-1 rounded">
                  conocimientos y experiencia del cliente
                </span>
                <span className="text-green-900 dark:text-green-100">
                  , su situación financiera y objetivos de inversión.
                </span>
                <span className="bg-red-200 dark:bg-red-900/40 px-1 rounded line-through">
                  {' '}La información se archivará en el sistema CRM.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-3">Leyenda de Colores</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-200 dark:bg-green-900/40 rounded"></div>
              <span>Coincidencia exacta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-amber-200 dark:bg-amber-900/40 rounded"></div>
              <span>Coincidencia parcial</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-200 dark:bg-red-900/40 rounded"></div>
              <span>Gap identificado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <span>Contenido adicional</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}