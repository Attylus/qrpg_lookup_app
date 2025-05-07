import { useState, useEffect } from 'react';
import { Input } from '../components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Card, CardContent } from '../components/ui/card';

import featsData from '../data/qrpg_feats.json';
import spellsData from '../data/qrpg_spells.json';

export default function QRPGLookupApp() {
  const [tab, setTab] = useState('feats');
  const [query, setQuery] = useState('');
  const [feats, setFeats] = useState([]);
  const [spells, setSpells] = useState([]);

  useEffect(() => {
    setFeats(featsData);
    setSpells(spellsData);
  }, []);

  const data = tab === 'feats' ? feats : spells;
  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">QRPG Lookup</h1>
      <Tabs value={tab} onValueChange={setTab} className="mb-4">
        <TabsList>
          <TabsTrigger value="feats">Feats</TabsTrigger>
          <TabsTrigger value="spells">Spells</TabsTrigger>
        </TabsList>
      </Tabs>
      <Input
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="mb-4"
      />
      <div className="grid gap-4">
        {filtered.map((item, i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <h2 className="font-semibold text-lg">{item.name}</h2>
              {tab === 'feats' ? (
                <>
                  <p className="text-sm text-muted-foreground">
                    Requirements: {item.requirements}
                  </p>
                  <p>{item.description}</p>
                </>
              ) : (
                <>
                  <p><strong>Damage:</strong> {item.damage}</p>
                  <p><strong>DoS Effect:</strong> {item.dosEffect}</p>
                  <p><strong>Cantrip:</strong> {item.cantrip}</p>
                  <p><strong>Event:</strong> {item.eventEffect}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
