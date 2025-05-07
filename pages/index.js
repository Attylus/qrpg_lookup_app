import { useState } from "react";
import { Input } from "../components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";

import feats from "../data/qrpg_feats.json";
import spells from "../data/qrpg_spells.json";

export default function Home() {
  const [tab, setTab] = useState("feats");
  const [search, setSearch] = useState("");

  const data = tab === "feats" ? feats : spells;

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">QRPG Lookup</h1>

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="feats">Feats</TabsTrigger>
          <TabsTrigger value="spells">Spells</TabsTrigger>
        </TabsList>
      </Tabs>

      <Input
        placeholder={`Search ${tab}...`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="space-y-4">
        {filteredData.map((item, i) => (
          <Card key={i}>
            <CardContent className="p-4 space-y-2">
              <h2 className="text-lg font-semibold">{item.name}</h2>
              {tab === "feats" ? (
                <>
                  {item.requirements && (
                    <p className="text-sm text-muted-foreground">
                      Requirements: {item.requirements}
                    </p>
                  )}
                  <p className="text-sm">{item.description}</p>
                </>
              ) : (
                <>
                  {item.damage && (
                    <p>
                      <strong>Damage:</strong> {item.damage}
                    </p>
                  )}
                  {item.dosEffect && (
                    <p>
                      <strong>DoS Effect:</strong> {item.dosEffect}
                    </p>
                  )}
                  {item.cantrip && (
                    <p>
                      <strong>Cantrip:</strong> {item.cantrip}
                    </p>
                  )}
                  {item.eventEffect && (
                    <p>
                      <strong>Event:</strong> {item.eventEffect}
                    </p>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}

        {filteredData.length === 0 && (
          <p className="text-center text-sm text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}
