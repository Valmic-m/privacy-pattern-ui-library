import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto bg-muted">
      <Separator />
      <div className="container mx-auto px-4 py-10">
        {/* Navigation */}
        <div className="mb-6">
          <h3 className="font-semibold text-foreground">Explore</h3>
          <nav className="mt-2 flex flex-wrap gap-4">
            <Link href="/" className="text-sm text-primary hover:underline">
              Pattern Library
            </Link>
            <Link
              href="/community/"
              className="text-sm text-primary hover:underline"
            >
              Community & FAQ
            </Link>
            <Link
              href="/future-plans/"
              className="text-sm text-primary hover:underline"
            >
              Future Plans
            </Link>
          </nav>
        </div>

        <Separator className="mb-6" />

        {/* Researcher and Supervisors */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Researcher */}
          <div>
            <h3 className="font-semibold text-foreground">Researcher</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Michaela Valiquette
            </p>
            <a
              href="mailto:michaelavaliquette@cmail.carleton.ca"
              className="text-sm text-primary hover:underline"
            >
              michaelavaliquette@cmail.carleton.ca
            </a>
            <p className="mt-1 text-sm text-muted-foreground">
              Faculty of Science (Human-Computer Interaction), Carleton
              University
            </p>
          </div>

          {/* Supervisors */}
          <div>
            <h3 className="font-semibold text-foreground">Supervisors</h3>
            <div className="mt-2 space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  Dr. Leah Zhang-Kennedy
                </p>
                <a
                  href="mailto:leahzhang@cunet.carleton.ca"
                  className="text-sm text-primary hover:underline"
                >
                  leahzhang@cunet.carleton.ca
                </a>
                <span className="text-sm text-muted-foreground">
                  {" "}
                  &mdash; School of Computer Science, Carleton University
                  (Adjunct)
                </span>
                <br />
                <a
                  href="mailto:lzhangke@uwaterloo.ca"
                  className="text-sm text-primary hover:underline"
                >
                  lzhangke@uwaterloo.ca
                </a>
                <span className="text-sm text-muted-foreground">
                  {" "}
                  &mdash; Stratford School of Interaction Design and Business,
                  University of Waterloo (Associate Professor)
                </span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Dr. Elizabeth Stobert
                </p>
                <a
                  href="mailto:elizabethstobert@cunet.carleton.ca"
                  className="text-sm text-primary hover:underline"
                >
                  elizabethstobert@cunet.carleton.ca
                </a>
                <span className="text-sm text-muted-foreground">
                  {" "}
                  &mdash; School of Computer Science, Carleton University
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Disclaimer */}
        <div>
          <h3 className="font-semibold text-foreground">Disclaimer</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            This library is provided for academic and research purposes only. It
            may not be copied, reproduced, or redistributed, in whole or in
            part, without explicit permission from the researcher. This library
            is intended to support GDPR-aligned design and privacy-by-design
            practices; however, it does not guarantee legal or regulatory
            compliance.
          </p>
        </div>

        <Separator className="my-6" />

        {/* Mission */}
        <div>
          <h3 className="font-semibold text-foreground">Mission</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            This UI Privacy Library supports privacy by design by translating
            regulatory principles into practical, human-centred interface
            patterns that help designers make privacy-respectful decisions
            throughout the design process.
          </p>
        </div>

        <Separator className="my-6" />

        {/* Analytics Disclosure */}
        <div>
          <h3 className="font-semibold text-foreground">Analytics</h3>
          <p className="mt-2 text-xs text-muted-foreground">
            We use Microsoft Clarity to understand how visitors interact with
            our website through aggregated behavioral metrics, heatmaps, and
            session replays. These insights help us improve site usability,
            content, and overall performance.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Usage data may be collected through first-party cookies and similar
            technologies to support site optimization and usability analysis.
            Microsoft processes this data on our behalf as an analytics service
            provider.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            For more information about how Microsoft processes data collected
            through Clarity, please review the{" "}
            <a
              href="https://privacy.microsoft.com/privacystatement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Microsoft Privacy Statement
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
