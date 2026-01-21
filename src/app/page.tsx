import { HeroBanner } from "@/components/hero-banner";
import { PatternsGallery } from "@/components/patterns-gallery";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroBanner />
      <div className="container mx-auto px-4 py-8">
        <PatternsGallery />
      </div>
    </main>
  );
}
