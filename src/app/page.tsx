import { PatternsGallery } from "@/components/patterns-gallery";

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          Privacy UI Patterns
        </h1>
        <p className="mt-2 text-muted-foreground">
          A catalog of privacy-focused UI design patterns for GDPR compliance
        </p>
      </header>
      <PatternsGallery />
    </main>
  );
}
