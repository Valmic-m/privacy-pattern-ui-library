import { ShieldCheck, Library } from "lucide-react";

export function HeroBanner() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div>
          <h1 className="flex items-center gap-3 text-4xl font-bold tracking-tight md:text-5xl">
            <ShieldCheck className="h-10 w-10 text-primary md:h-12 md:w-12" />
            <Library className="h-10 w-10 text-primary md:h-12 md:w-12" />
            <span>Privacy UI Pattern Library</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            A catalog of privacy-focused UI design patterns intended to support
            GDPR compliance by showcasing practical, human-centred interface
            patterns mapped to regulatory concepts.
          </p>
        </div>
      </div>
    </section>
  );
}
