import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Edit, Trash2, Calendar, User, Tag, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Report {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'draft' | 'in_progress';
  createdAt: string;
  author: string;
  tags: string[];
  type: string;
}

interface ReportCardProps {
  report: Report;
}

export function ReportCard({ report }: ReportCardProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Completado</Badge>;
      case 'draft':
        return <Badge variant="secondary">Borrador</Badge>;
      case 'in_progress':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">En Proceso</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleDownload = () => {
    // Simular descarga
    console.log('Downloading report:', report.id);
  };

  const handleEdit = () => {
    // Navegar a edición
    console.log('Editing report:', report.id);
  };

  const handleDelete = () => {
    // Confirmar y eliminar
    console.log('Deleting report:', report.id);
  };

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="h-5 w-5 text-primary" />
              {report.title}
            </CardTitle>
            <CardDescription className="mt-1">
              {report.description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {getStatusBadge(report.status)}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleEdit}>
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Descargar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDelete} className="text-red-600">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {report.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              <Tag className="h-3 w-3 mr-1" />
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              {report.author}
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(report.createdAt).toLocaleDateString('es-ES')}
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            {report.type}
          </Badge>
        </div>

        <div className="flex gap-2 pt-2">
          {report.status === 'completed' && (
            <Button size="sm" onClick={handleDownload} className="gap-2">
              <Download className="h-3 w-3" />
              Descargar
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleEdit} className="gap-2">
            <Edit className="h-3 w-3" />
            {report.status === 'completed' ? 'Ver' : 'Continuar'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}