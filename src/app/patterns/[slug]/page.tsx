import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Layers,
  Clock,
  SlidersHorizontal,
  Scale,
  Settings,
  ShieldCheck,
  Undo2,
  type LucideIcon,
} from "lucide-react";
import { loadCatalog } from "@/lib/catalog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExamplesSection } from "@/components/examples-section";
import { GdprMappingCard } from "@/components/gdpr-mapping-card";
import { TheoreticalPlaygroundCard } from "@/components/theoretical-playground-card";
import type { RiskLevel } from "@/types/catalog";

const patternIcons: Record<string, LucideIcon> = {
  "pat-001": Layers,
  "pat-002": Clock,
  "pat-003": SlidersHorizontal,
  "pat-004": Scale,
  "pat-005": Settings,
  "pat-006": ShieldCheck,
  "pat-007": Undo2,
};

interface PatternPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all patterns (static export)
export async function generateStaticParams() {
  const { catalog } = loadCatalog();
  return catalog.patterns.map((p) => ({ slug: p.slug }));
}

// Generate metadata for each pattern
export async function generateMetadata({ params }: PatternPageProps) {
  const { slug } = await params;
  const { getPatternBySlug } = loadCatalog();
  const pattern = getPatternBySlug(slug);

  if (!pattern) {
    return { title: "Pattern Not Found" };
  }

  return {
    title: `${pattern.name} | Privacy UI Patterns`,
    description: pattern.definition,
  };
}

function getRiskBadgeVariant(level: RiskLevel) {
  switch (level) {
    case "low":
      return "low";
    case "medium":
      return "medium";
    case "high":
      return "high";
    default:
      return "secondary";
  }
}

export default async function PatternPage({ params }: PatternPageProps) {
  const { slug } = await params;
  const { getPatternBySlug, getExamplesForPattern } = loadCatalog();
  const pattern = getPatternBySlug(slug);

  if (!pattern) {
    notFound();
  }

  const examples = getExamplesForPattern(pattern.id);
  const Icon = patternIcons[pattern.id];

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Back link */}
      <Button variant="ghost" size="sm" asChild className="mb-6 gap-2">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Back to Patterns
        </Link>
      </Button>

      {/* Header */}
      <header className="mb-8 max-w-3xl mx-auto">
        <h1 className="flex items-center gap-3 text-3xl font-bold tracking-tight">
          {Icon && <Icon className="h-8 w-8 text-primary shrink-0" />}
          {pattern.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
          {pattern.definition}
        </p>
        <div className="mt-4 rounded-lg bg-muted/50 p-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            Goal
          </h2>
          <p className="mt-1 text-foreground">{pattern.goal}</p>
        </div>
      </header>

      {/* GDPR Mapping Card */}
      <div className="max-w-3xl mx-auto">
        <GdprMappingCard gdprBasis={pattern.gdprBasis} />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="max-w-3xl mx-auto">
        <TabsList className="flex-wrap h-auto gap-1 bg-primary/10">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usecases">Use Cases</TabsTrigger>
          <TabsTrigger value="pitfalls">Pitfalls</TabsTrigger>
          <TabsTrigger value="heuristics">Heuristics</TabsTrigger>
          <TabsTrigger value="evidence">Evidence</TabsTrigger>
          <TabsTrigger value="examples">
            Examples ({examples.length})
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-3">
              Key Design Expectations
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {pattern.designGuidance.keyDesignExpectationsAbstract}
            </p>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-semibold mb-3">
              Design Choices That Support Heuristics
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {pattern.designGuidance.designChoicesThatSupportHeuristics}
            </p>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-semibold mb-3">Evaluative Questions</h3>
            <ul className="space-y-2">
              {pattern.designGuidance.evaluativeQuestions.map((q, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-muted-foreground leading-relaxed"
                >
                  <span className="flex-shrink-0 text-primary font-medium">
                    {i + 1}.
                  </span>
                  {q}
                </li>
              ))}
            </ul>
          </section>
        </TabsContent>

        {/* Use Cases Tab */}
        <TabsContent value="usecases" className="mt-6">
          <section>
            <h3 className="text-lg font-semibold mb-3">When to Use</h3>
            <p className="text-muted-foreground leading-relaxed">
              {pattern.useCases.raw}
            </p>
          </section>
        </TabsContent>

        {/* Pitfalls Tab */}
        <TabsContent value="pitfalls" className="mt-6">
          <section>
            <h3 className="text-lg font-semibold mb-3">Common Pitfalls</h3>
            <Accordion type="single" collapsible className="w-full">
              {pattern.pitfalls.items.map((pitfall) => (
                <AccordionItem key={pitfall.id} value={pitfall.id}>
                  <AccordionTrigger className="text-left gap-3">
                    <div className="flex items-center gap-3 flex-1">
                      <Badge variant={getRiskBadgeVariant(pitfall.riskLevel)}>
                        {pitfall.riskLevel}
                      </Badge>
                      <span>{pitfall.text}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">
                      Risk Level:{" "}
                      <span className="capitalize font-medium">
                        {pitfall.riskLevel}
                      </span>
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        </TabsContent>

        {/* Heuristics Tab */}
        <TabsContent value="heuristics" className="mt-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-3">
              Usability Considerations
            </h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {pattern.heuristics.considerations.map((c) => (
                <Badge key={c} variant="secondary">
                  {c}
                </Badge>
              ))}
            </div>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-semibold mb-3">Why These Matter</h3>
            <p className="text-muted-foreground leading-relaxed">
              {pattern.heuristics.whyTheseMatter}
            </p>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-semibold mb-3">Sources</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {pattern.heuristics.sourceRaw}
            </p>
          </section>
        </TabsContent>

        {/* Evidence Tab */}
        <TabsContent value="evidence" className="mt-6 space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-3">Use Case Evidence</h3>
            <ul className="space-y-2">
              {pattern.evidence.useCases.citations.map((c, i) => (
                <li key={i} className="text-muted-foreground">
                  • {c}
                </li>
              ))}
            </ul>
          </section>

          <Separator />

          <section>
            <h3 className="text-lg font-semibold mb-3">Pitfall Evidence</h3>
            <ul className="space-y-2">
              {pattern.evidence.pitfalls.citations.map((c, i) => (
                <li key={i} className="text-muted-foreground">
                  • {c}
                </li>
              ))}
            </ul>
          </section>
        </TabsContent>

        {/* Examples Tab */}
        <TabsContent value="examples" className="mt-6">
          {examples.length > 0 ? (
            <ExamplesSection examples={examples} />
          ) : (
            <section>
              <h3 className="text-lg font-semibold mb-4">
                Real-World Examples (0)
              </h3>
              <p className="text-muted-foreground">
                No examples available for this pattern.
              </p>
            </section>
          )}
          {pattern.theoreticalPlaygroundUrl && (
            <TheoreticalPlaygroundCard url={pattern.theoreticalPlaygroundUrl} />
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}

