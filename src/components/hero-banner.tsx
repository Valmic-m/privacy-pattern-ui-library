export function HeroBanner() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Privacy UI Patterns Library
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          A catalog of privacy-focused UI design patterns intended to support
          GDPR compliance by showcasing practical, human-centred interface
          patterns mapped to regulatory concepts.
        </p>
      </div>
    </section>
  );
}
