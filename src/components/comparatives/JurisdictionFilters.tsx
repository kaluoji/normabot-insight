import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter } from 'lucide-react';

interface JurisdictionFiltersProps {
  selectedJurisdictions: string[];
  selectedTopics: string[];
  onJurisdictionsChange: (jurisdictions: string[]) => void;
  onTopicsChange: (topics: string[]) => void;
}

const jurisdictions = [
  { id: 'ES', name: 'España', flag: '🇪🇸' },
  { id: 'FR', name: 'Francia', flag: '🇫🇷' },
  { id: 'DE', name: 'Alemania', flag: '🇩🇪' },
  { id: 'UK', name: 'Reino Unido', flag: '🇬🇧' },
  { id: 'US', name: 'Estados Unidos', flag: '🇺🇸' }
];

const topics = [
  { id: 'solvency', name: 'Solvencia', color: 'bg-blue-100 text-blue-800' },
  { id: 'liquidity', name: 'Liquidez', color: 'bg-green-100 text-green-800' },
  { id: 'conduct', name: 'Conducta', color: 'bg-purple-100 text-purple-800' },
  { id: 'esg', name: 'ESG', color: 'bg-emerald-100 text-emerald-800' }
];

export function JurisdictionFilters({ 
  selectedJurisdictions, 
  selectedTopics, 
  onJurisdictionsChange, 
  onTopicsChange 
}: JurisdictionFiltersProps) {
  const toggleJurisdiction = (id: string) => {
    const newSelection = selectedJurisdictions.includes(id)
      ? selectedJurisdictions.filter(j => j !== id)
      : [...selectedJurisdictions, id];
    onJurisdictionsChange(newSelection);
  };

  const toggleTopic = (id: string) => {
    const newSelection = selectedTopics.includes(id)
      ? selectedTopics.filter(t => t !== id)
      : [...selectedTopics, id];
    onTopicsChange(newSelection);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Jurisdicciones
            </h3>
            <div className="flex flex-wrap gap-2">
              {jurisdictions.map((jurisdiction) => (
                <Button
                  key={jurisdiction.id}
                  variant={selectedJurisdictions.includes(jurisdiction.id) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => toggleJurisdiction(jurisdiction.id)}
                  className="gap-2"
                >
                  <span>{jurisdiction.flag}</span>
                  {jurisdiction.name}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Áreas Regulatorias</h3>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Badge
                  key={topic.id}
                  variant={selectedTopics.includes(topic.id) ? 'default' : 'outline'}
                  className={`cursor-pointer ${selectedTopics.includes(topic.id) ? topic.color : ''}`}
                  onClick={() => toggleTopic(topic.id)}
                >
                  {topic.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}