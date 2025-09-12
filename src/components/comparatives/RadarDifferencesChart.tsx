import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

interface RadarDifferencesChartProps {
  data: any[];
  jurisdictions: string[];
}

export function RadarDifferencesChart({ data, jurisdictions }: RadarDifferencesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Análisis Visual de Diferencias
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
          <div className="text-center text-muted-foreground">
            <BarChart3 className="h-12 w-12 mx-auto mb-2" />
            <div>Gráfico de radar en desarrollo</div>
            <div className="text-sm">Mostrará convergencias y divergencias</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}