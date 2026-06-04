"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown, ChevronUp, MessageCircleQuestion } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Hvordan tilføjer jeg en ny enhed?",
    answer:
      'Gå til siden "Enheder" og klik på knappen "Tilføj enhed" øverst til højre. Følg derefter opsætningsguiden for at forbinde din enhed til strøm og WiFi, og tildel en lokation.',
  },
  {
    question: "Hvordan ændrer jeg alarmgrænsen for temperatur?",
    answer:
      'Gå til "Indstillinger" → "Alarmer" og juster tærskelværdien. Husk at alarmer skal være aktiverede for at notifikationer sendes.',
  },
  {
    question: "Kan jeg se historiske data for en bestemt dag?",
    answer:
      'Ja. Gå til "Historik", vælg en Fra- og Til-dato i filteret, og tryk "Filtrer". Du kan eksportere resultaterne som CSV ved at trykke på knappen øverst til højre.',
  },
  {
    question: "Hvad betyder de forskellige alarmtyper?",
    answer:
      '"Høj temperatur" udløses, når temperaturen overstiger din konfigurerede tærskel. "Lav temperatur" udløses ved unormalt lave værdier.',
  },
  {
    question: "Hvordan logger jeg ud?",
    answer: 'Gå til "Indstillinger" og klik på den røde "Log ud" knap nederst på siden.',
  },
];

function FAQRow({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="cursor-pointer select-none border-b border-indigo-100 last:border-0 data-[open=true]:bg-indigo-50/80"
      data-open={open}
      onClick={() => setOpen((v) => !v)}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <p className="text-sm font-medium text-indigo-950">{item.question}</p>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-indigo-500" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-indigo-400" />
        )}
      </div>
      {open && (
        <p className="px-5 pb-4 text-sm text-indigo-800/75 leading-relaxed">{item.answer}</p>
      )}
    </div>
  );
}

export default function HelpPage() {
  return (
    <div className="w-full space-y-6">
      <div className="rounded-2xl border border-indigo-200 bg-indigo-50/80 px-5 py-4">
        <h1 className="text-2xl font-bold text-indigo-950">Hjælp</h1>
        <p className="mt-1 text-sm text-indigo-800/70">
          Find svar på de mest stillede spørgsmål og guides til at komme i gang.
        </p>
      </div>

      <section className="space-y-3">
        <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-indigo-500">
          <MessageCircleQuestion className="h-4 w-4" />
          Ofte stillede spørgsmål
        </div>
        <Card className="overflow-hidden border-indigo-200 bg-white shadow-sm">
          <CardContent className="p-0">
            {FAQ_ITEMS.map((item) => (
              <FAQRow key={item.question} item={item} />
            ))}
          </CardContent>
        </Card>
      </section>

      <Card className="border-emerald-200 bg-emerald-50/80">
        <CardContent className="p-5 space-y-1">
          <p className="text-sm font-medium text-emerald-950">Har du stadig brug for hjælp?</p>
          <p className="text-sm text-emerald-800/75">
            Kontakt support på{" "}
            <a href="mailto:support@iotprojekt.dk" className="text-primary hover:underline">
              support@iotprojekt.dk
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}