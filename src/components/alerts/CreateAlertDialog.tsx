import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface CreateAlertDialogProps {
  open: boolean;
  onClose: () => void;
}

export function CreateAlertDialog({ open, onClose }: CreateAlertDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Crear Nueva Alerta</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Título de la Alerta</Label>
            <Input id="title" placeholder="Ej: Nuevas Guidelines MiFID II" />
          </div>
          <div>
            <Label htmlFor="description">Descripción</Label>
            <Textarea id="description" placeholder="Describe qué tipo de contenido quieres monitorear..." />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={onClose}>Crear Alerta</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}