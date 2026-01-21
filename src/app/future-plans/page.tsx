import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Future Plans | Privacy UI Patterns",
  description:
    "Looking ahead: the evolving vision for the Privacy UI Pattern Library, including expanded regulatory coverage, industry tagging, and collaborative contributions.",
};

const plannedRegulations = {
  europe: [
    {
      name: "ePrivacy Directive (and proposed ePrivacy Regulation)",
      links: [
        "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32002L0058",
        "https://digital-strategy.ec.europa.eu/en/policies/eprivacy-regulation",
      ],
    },
  ],
  northAmerica: [
    {
      name: "CCPA — California Consumer Privacy Act",
      links: ["https://oag.ca.gov/privacy/ccpa"],
    },
    {
      name: "CPRA — California Privacy Rights Act",
      links: ["https://cppa.ca.gov/regulations/"],
    },
    {
      name: "PIPEDA — Personal Information Protection and Electronic Documents Act (Canada)",
      links: ["https://laws-lois.justice.gc.ca/eng/acts/p-8.6/"],
    },
    {
      name: "HIPAA — Health Insurance Portability and Accountability Act (United States)",
      links: ["https://www.hhs.gov/hipaa/index.html"],
    },
    {
      name: "COPPA — Children's Online Privacy Protection Act (United States)",
      links: [
        "https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa",
      ],
    },
    {
      name: "GLBA — Gramm–Leach–Bliley Act (United States)",
      links: [
        "https://www.ftc.gov/business-guidance/privacy-security/gramm-leach-bliley-act",
      ],
    },
  ],
};

const taggingDimensions = [
  {
    label: "Industry context",
    examples: "healthcare, finance, education, e-commerce, public sector",
  },
  {
    label: "Product type",
    examples: "consumer apps, enterprise tools, data platforms",
  },
  {
    label: "User sensitivity level",
    examples: "children, patients, financially vulnerable users",
  },
  {
    label: "Data context",
    examples: "health data, financial data, location data",
  },
];

const futureUpdates = [
  "Additional validated patterns and sub-patterns",
  "Expanded empirical and regulatory references",
  "Industry-specific examples and templates",
  "Community-informed questions and discussions",
  "Iterative refinement based on designer feedback",
];

export default function FuturePlansPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Future Plans
          </h1>
          <p className="mt-2 text-xl text-muted-foreground">Looking Ahead</p>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            The Privacy UI Pattern Library is an evolving, research-led
            resource. While it currently focuses on mapping privacy-focused
            interface patterns to GDPR-related regulatory concepts, its
            longer-term aim is to grow into a broader design support tool that
            helps designers engage more critically and confidently with
            privacy-respecting interface design.
          </p>
          <p className="mt-4 max-w-3xl text-muted-foreground">
            As privacy expectations, technologies, and regulatory landscapes
            continue to evolve, this library is intended to evolve alongside
            design practice—remaining adaptable, reflective, and grounded in
            human-centred design principles.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Section 1: Open Collaborative Resource */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Toward an Open, Collaborative Resource
          </h2>
          <p className="mt-4 text-muted-foreground">
            A key future direction is to explore how this library could
            transition into a more open and collaborative resource for
            designers. Over time, the goal is to enable designers, researchers,
            and practitioners to contribute insights, examples, and refinements
            informed by real-world design contexts.
          </p>
          <p className="mt-4 text-muted-foreground">
            Any future open contribution model would remain curated and
            moderated to:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
            <li>Maintain research integrity and quality</li>
            <li>Ensure relevance to interface-level design decisions</li>
            <li>Support constructive, privacy-aware discourse</li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            By encouraging shared learning, the library aims to foster a
            stronger privacy mindset across the design community while remaining
            intentionally scoped and governance-driven.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 2: Expanding Regulatory Coverage */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Expanding Regulatory Coverage
          </h2>
          <p className="mt-4 text-muted-foreground">
            A major next step for the Privacy UI Pattern Library is to expand
            beyond GDPR-focused mappings to include additional privacy and data
            protection frameworks across regions and sectors. This expansion is
            intended to help designers recognize recurring privacy concepts
            across regulatory contexts and better understand how interface-level
            decisions may support privacy-respecting design practices.
          </p>
          <p className="mt-4 text-muted-foreground">
            Planned regulatory frameworks for future mapping include:
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Europe */}
            <Card>
              <CardHeader>
                <CardTitle>Europe</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plannedRegulations.europe.map((reg) => (
                    <li key={reg.name}>
                      <p className="font-medium text-foreground">{reg.name}</p>
                      <div className="mt-1 space-y-1">
                        {reg.links.map((link) => (
                          <a
                            key={link}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm text-primary hover:underline break-all"
                          >
                            {link}
                          </a>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* North America */}
            <Card>
              <CardHeader>
                <CardTitle>North America</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {plannedRegulations.northAmerica.map((reg) => (
                    <li key={reg.name}>
                      <p className="font-medium text-foreground">{reg.name}</p>
                      <div className="mt-1 space-y-1">
                        {reg.links.map((link) => (
                          <a
                            key={link}
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm text-primary hover:underline break-all"
                          >
                            {link}
                          </a>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Section 3: Industry and Context-Based Tagging */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Industry and Context-Based Tagging
          </h2>
          <p className="mt-4 text-muted-foreground">
            Future iterations of the library aim to incorporate industry- and
            context-based tagging to help designers more easily find patterns,
            examples, and templates that align with the specific domains in
            which they work.
          </p>
          <p className="mt-4 text-muted-foreground">
            Planned tagging dimensions may include:
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {taggingDimensions.map((dim) => (
              <div key={dim.label} className="rounded-lg bg-muted/50 p-4">
                <h3 className="font-semibold text-foreground">{dim.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  e.g., {dim.examples}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-muted-foreground">
            By enabling designers to filter patterns and examples by industry
            and context, the library aims to:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
            <li>Improve relevance for real-world design scenarios</li>
            <li>Support designers working in regulated or high-risk domains</li>
            <li>
              Help bridge the gap between abstract regulatory concepts and
              domain-specific design decisions
            </li>
          </ul>
          <p className="mt-4 text-muted-foreground">
            This approach is intended to complement regulatory mappings, not
            replace domain expertise or legal interpretation.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 4: Scope and Intent */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight">Scope and Intent</h2>
          <p className="mt-4 text-muted-foreground">
            Future regulatory and industry mappings will focus on identifying
            shared privacy concepts—such as transparency, consent, user control,
            data minimization, and access rights—and examining how these
            concepts may be reflected in interface-level design patterns across
            different contexts.
          </p>
          <p className="mt-4 text-muted-foreground">
            These efforts are intended to:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
            <li>
              Support designers in understanding privacy expectations within
              their domain
            </li>
            <li>
              Reduce cognitive and interpretive barriers when designing for
              privacy
            </li>
            <li>
              Make privacy-by-design practices more approachable and attainable
              within everyday design workflows
            </li>
          </ul>

          <div className="mt-6 rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground italic">
              This library does not provide legal advice or guarantee regulatory
              compliance. It is intended as a design support and research
              resource.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Section 5: Ongoing Research and Iteration */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Ongoing Research and Iteration
          </h2>
          <p className="mt-4 text-muted-foreground">
            The Privacy UI Pattern Library will continue to evolve through
            ongoing research, evaluation, and reflection. Future updates may
            include:
          </p>
          <ul className="mt-4 list-inside list-disc space-y-2 text-muted-foreground">
            {futureUpdates.map((update) => (
              <li key={update}>{update}</li>
            ))}
          </ul>
          <p className="mt-4 text-muted-foreground">
            By remaining research-driven and intentionally scoped, the library
            aims to balance practical usefulness with academic rigor.
          </p>
        </section>

        <Separator className="my-10" />

        {/* Section 6: A Shared Goal */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight">A Shared Goal</h2>
          <p className="mt-4 text-muted-foreground">
            At its core, the long-term vision of the Privacy UI Pattern Library
            is to help make privacy-respecting interface design more
            understandable, achievable, and embedded within everyday design
            practice—supporting designers as they navigate complex regulatory,
            ethical, and domain-specific considerations while creating
            meaningful, human-centred user experiences.
          </p>
        </section>
      </div>
    </main>
  );
}
