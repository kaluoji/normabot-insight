import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, XCircle, AlertCircle, Edit, Save, X, Download, User, Calendar } from 'lucide-react';

interface Finding {
  id: string;
  requirement: string;
  clause: string;
  policyReference: string;
  status: 'compliant' | 'partial' | 'non_compliant';
  severity: 'low' | 'medium' | 'high';
  description: string;
  recommendation: string;
  owner: string;
  targetDate: string;
  evidence: string;
}

interface GapFindingsTableProps {
  findings: Finding[];
}

export function GapFindingsTable({ findings }: GapFindingsTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<Partial<Finding>>({});

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

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high': return <Badge variant="destructive">Alta</Badge>;
      case 'medium': return <Badge variant="default" className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">Media</Badge>;
      case 'low': return <Badge variant="outline">Baja</Badge>;
      default: return null;
    }
  };

  const handleEdit = (finding: Finding) => {
    setEditingId(finding.id);
    setEditingData(finding);
  };

  const handleSave = () => {
    // Implementar guardado
    console.log('Saving finding:', editingData);
    setEditingId(null);
    setEditingData({});
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingData({});
  };

  const handleExportCSV = () => {
    // Implementar exportación a CSV
    console.log('Exporting to CSV');
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {findings.length} hallazgos encontrados
        </div>
        <Button variant="outline" size="sm" onClick={handleExportCSV} className="gap-2">
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Estado</TableHead>
              <TableHead>Requisito</TableHead>
              <TableHead>Cláusula</TableHead>
              <TableHead>Ref. Política</TableHead>
              <TableHead>Severidad</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Recomendación</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead>Fecha Objetivo</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {findings.map((finding) => (
              <TableRow key={finding.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(finding.status)}
                    {getStatusBadge(finding.status)}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{finding.requirement}</div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{finding.clause}</Badge>
                </TableCell>
                <TableCell>
                  {editingId === finding.id ? (
                    <Input
                      value={editingData.policyReference || ''}
                      onChange={(e) => setEditingData(prev => ({ ...prev, policyReference: e.target.value }))}
                      className="w-full"
                    />
                  ) : (
                    <div className="text-sm">
                      {finding.policyReference || (
                        <span className="text-muted-foreground italic">No definido</span>
                      )}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {getSeverityBadge(finding.severity)}
                </TableCell>
                <TableCell>
                  {editingId === finding.id ? (
                    <Textarea
                      value={editingData.description || ''}
                      onChange={(e) => setEditingData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full min-w-[200px]"
                      rows={2}
                    />
                  ) : (
                    <div className="text-sm max-w-[200px]">{finding.description}</div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === finding.id ? (
                    <Textarea
                      value={editingData.recommendation || ''}
                      onChange={(e) => setEditingData(prev => ({ ...prev, recommendation: e.target.value }))}
                      className="w-full min-w-[200px]"
                      rows={2}
                    />
                  ) : (
                    <div className="text-sm max-w-[200px]">{finding.recommendation}</div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === finding.id ? (
                    <Input
                      value={editingData.owner || ''}
                      onChange={(e) => setEditingData(prev => ({ ...prev, owner: e.target.value }))}
                      className="w-full"
                    />
                  ) : (
                    <div className="flex items-center gap-1 text-sm">
                      <User className="h-3 w-3" />
                      {finding.owner}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {editingId === finding.id ? (
                    <Input
                      type="date"
                      value={editingData.targetDate || ''}
                      onChange={(e) => setEditingData(prev => ({ ...prev, targetDate: e.target.value }))}
                      className="w-full"
                    />
                  ) : (
                    <div className="flex items-center gap-1 text-sm">
                      <Calendar className="h-3 w-3" />
                      {new Date(finding.targetDate).toLocaleDateString('es-ES')}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {editingId === finding.id ? (
                      <>
                        <Button size="icon" variant="ghost" onClick={handleSave} className="h-8 w-8">
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={handleCancel} className="h-8 w-8">
                          <X className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => handleEdit(finding)}
                        className="h-8 w-8"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <div>
          Última actualización: {new Date().toLocaleString('es-ES')}
        </div>
        <div className="flex gap-4">
          <span>✓ {findings.filter(f => f.status === 'compliant').length} Conformes</span>
          <span>⚠ {findings.filter(f => f.status === 'partial').length} Parciales</span>
          <span>✗ {findings.filter(f => f.status === 'non_compliant').length} No Conformes</span>
        </div>
      </div>
    </div>
  );
}