import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FAQSubmissionForm } from "@/components/community/faq-submission-form";
import { CommunityQuestionForm } from "@/components/community/community-question-form";

export const metadata: Metadata = {
  title: "Community & FAQ | Privacy UI Patterns",
  description:
    "Questions, reflections, and practice-oriented insights related to privacy-respectful interface design.",
};

const faqCategoryGeneral = {
  id: "privacy-ui-general",
  title: "Privacy UI Design (General)",
  description:
    "This section addresses common questions designers have about privacy in interface design, including principles, patterns, and design decision-making in real-world contexts.",
  items: [
    {
      id: "faq-1",
      question:
        'What is meant by "privacy by design" in UI and product interfaces?',
      answer:
        "Privacy by design refers to integrating privacy considerations into design decisions from the earliest stages of a product or interface, rather than addressing them after implementation. In UI design, this often involves making data practices visible, understandable, and controllable for users.",
    },
    {
      id: "faq-2",
      question: "How do UI decisions influence user privacy outcomes?",
      answer:
        "Interface choices—such as defaults, wording, layout, and interaction flow—can significantly affect how users understand and engage with privacy controls. These decisions may influence consent quality, user trust, and the likelihood of unintended data disclosure.",
    },
    {
      id: "faq-3",
      question: "What are common pitfalls or dark patterns related to privacy?",
      answer:
        "Common pitfalls include unclear consent requests, hidden settings, misleading language, and friction-heavy opt-out flows. These patterns may undermine user autonomy and informed decision-making, even when legal requirements are technically met.",
    },
    {
      id: "faq-4",
      question:
        "How can designers balance usability, business goals, and privacy?",
      answer:
        "Balancing these factors often involves transparent communication, thoughtful defaults, and iterative testing. Privacy-respectful design does not preclude business objectives, but requires intentional tradeoff analysis and user-centred decision-making.",
    },
  ],
};

const faqCategoryLibrary = {
  id: "library-specific",
  title: "Privacy UI Pattern Library",
  description:
    "This section focuses specifically on questions about the development and scope of the Privacy UI Pattern Library.",
  items: [
    {
      id: "faq-5",
      question: "How were the patterns selected and validated?",
      answer:
        "Patterns were selected through a review of regulatory guidance, existing design research, and empirically studied privacy-related UI practices. Where available, patterns are grounded in peer-reviewed research or regulatory interpretation. The library is intended as a design support resource rather than an exhaustive or prescriptive standard.",
    },
  ],
};

export default function CommunityPage() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Privacy UI Pattern Community & FAQ
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            This space supports designers in developing a stronger privacy
            mindset by sharing questions, reflections, and practice-oriented
            insights related to privacy-respectful interface design. All
            submissions are reviewed prior to publication to ensure relevance,
            quality, and alignment with the goals of this research-led library.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Section 1: FAQ */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-muted-foreground">
            Select a question to expand the answer. Only one question may be
            expanded at a time.
          </p>

          {/* Category 1: Privacy UI Design (General) */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold">
              {faqCategoryGeneral.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {faqCategoryGeneral.description}
            </p>
            <Accordion type="single" collapsible className="mt-4">
              {faqCategoryGeneral.items.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Category 2: Privacy UI Pattern Library */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold">
              {faqCategoryLibrary.title}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {faqCategoryLibrary.description}
            </p>
            <Accordion type="single" collapsible className="mt-4">
              {faqCategoryLibrary.items.map((item) => (
                <AccordionItem key={item.id} value={item.id}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* FAQ Submission Form */}
          <div className="mt-10">
            <FAQSubmissionForm />
          </div>
        </section>

        <Separator className="my-10" />

        {/* Section 2: Community Questions & Discussion */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Community Questions & Discussion
          </h2>
          <p className="mt-2 text-muted-foreground">
            This section enables designers to learn from one another by posing
            design-focused questions and contributing thoughtful responses. The
            goal is to encourage reflection, shared learning, and privacy-aware
            design practices.
          </p>

          {/* Community Question Form */}
          <div className="mt-8">
            <CommunityQuestionForm />
          </div>

          {/* Community Responses Placeholder */}
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Community Responses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Once a question is approved and posted, community members may
                  submit responses. Responses are reviewed prior to publication.
                  Moderators may remove or edit responses that are off-topic,
                  misleading, promotional, or inappropriate.
                </p>
                <div className="mt-4 rounded-lg border border-dashed p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No community questions have been published yet. Check back
                    later or submit a question above.
                  </p>
                </div>
                <p className="mt-4 text-xs text-muted-foreground italic">
                  Community responses reflect individual perspectives and do not
                  constitute legal advice or regulatory guidance.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Moderation Statement */}
          <div className="mt-8 rounded-lg bg-muted/50 p-4">
            <h3 className="font-semibold text-foreground">
              Moderation & Governance
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              All submitted questions and responses are subject to review prior
              to publication. Content may be edited or removed at any time to
              maintain quality, relevance, and a respectful, research-informed
              environment. This community exists to support learning and
              discussion—not to provide legal advice or compliance guarantees.
            </p>
          </div>
        </section>

        <Separator className="my-10" />

        {/* Data Notices */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight">
            Data Handling & Privacy
          </h2>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-muted/50 p-4">
              <h3 className="font-semibold text-foreground">
                Data Collection Notice
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Only the information provided in this form will be collected.
                Providing an email address is optional and will be used solely
                for follow-up related to your submission.
              </p>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <h3 className="font-semibold text-foreground">
                Data Use Statement
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Submitted questions and responses are reviewed for relevance and
                quality. Approved content may be displayed publicly. Personal
                identifiers are not required and should not be included in
                submissions.
              </p>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <h3 className="font-semibold text-foreground">
                Retention & Removal
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Submissions and responses may be edited or removed at any time.
                Contributors may request removal of their content by contacting
                the research team.
              </p>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <h3 className="font-semibold text-foreground">Legal Disclaimer</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This community and library support privacy-aware design
                practices but do not provide legal advice or guarantee
                regulatory compliance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
