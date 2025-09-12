import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter } from 'lucide-react';

interface UpdatesFilterBarProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedSources: string[];
  onSourcesChange: (sources: string[]) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}

const sources = ['ESMA', 'EBA', 'ECB', 'CNMV', 'BdE', 'EIOPA'];
const tags = ['MiFID II', 'Solvencia II', 'DORA', 'ESG', 'PSD2', 'GDPR'];

export function UpdatesFilterBar({ 
  searchTerm, 
  onSearchChange, 
  selectedSources, 
  onSourcesChange,
  selectedTags,
  onTagsChange
}: UpdatesFilterBarProps) {
  const toggleSource = (source: string) => {
    const newSources = selectedSources.includes(source)
      ? selectedSources.filter(s => s !== source)
      : [...selectedSources, source];
    onSourcesChange(newSources);
  };

  const toggleTag = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    onTagsChange(newTags);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar en novedades..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Organismos:</span>
          {sources.map((source) => (
            <Badge
              key={source}
              variant={selectedSources.includes(source) ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => toggleSource(source)}
            >
              {source}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <span className="text-sm font-medium">Etiquetas:</span>
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTags.includes(tag) ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}