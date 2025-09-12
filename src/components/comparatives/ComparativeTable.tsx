import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface ComparativeData {
  requirement: string;
  topic: string;
  [key: string]: any;
}

interface ComparativeTableProps {
  data: ComparativeData[];
  jurisdictions: string[];
}

export function ComparativeTable({ data, jurisdictions }: ComparativeTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'implemented': return <Badge className="bg-green-100 text-green-800">Implementado</Badge>;
      case 'proposed': return <Badge className="bg-blue-100 text-blue-800">Propuesto</Badge>;
      case 'divergent': return <Badge className="bg-amber-100 text-amber-800">Divergente</Badge>;
      case 'different': return <Badge className="bg-red-100 text-red-800">Diferente</Badge>;
      case 'voluntary': return <Badge variant="outline">Voluntario</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold">Requisito</TableHead>
            {jurisdictions.map((jurisdiction) => (
              <TableHead key={jurisdiction} className="text-center font-semibold">
                {jurisdiction}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {item.requirement}
              </TableCell>
              {jurisdictions.map((jurisdiction) => {
                const jurisdictionData = item[jurisdiction];
                return (
                  <TableCell key={jurisdiction} className="text-center">
                    <div className="space-y-2">
                      {getStatusBadge(jurisdictionData?.status || 'unknown')}
                      <div className="text-sm font-medium">
                        {jurisdictionData?.value}
                      </div>
                      {jurisdictionData?.notes && (
                        <div className="text-xs text-muted-foreground">
                          {jurisdictionData.notes}
                        </div>
                      )}
                    </div>
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}