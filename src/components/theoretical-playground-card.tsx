import { Figma, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TheoreticalPlaygroundCardProps {
  url: string;
}

export function TheoreticalPlaygroundCard({ url }: TheoreticalPlaygroundCardProps) {
  return (
    <Card className="mt-8 bg-gradient-to-r from-muted/50 to-muted border-primary/20">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-shrink-0 p-3 rounded-lg bg-background border">
            <Figma className="h-8 w-8 text-primary" />
          </div>
          <div className="flex-1 space-y-1">
            <h4 className="font-semibold text-lg">Theoretical "Ideals" Playground</h4>
            <p className="text-muted-foreground text-sm">
              Explore editable Figma UI pattern templates designed to reflect core privacy-respecting UI pattern principles, with flexibility for contextual adaptation. This space offers additional inspiration and supports deeper exploration of how privacy-aware design can be applied in real-world interfaces. These templates are provided as design guidance only and do not guarantee legal or regulatory compliance.
            </p>
          </div>
          <Button asChild className="gap-2 flex-shrink-0">
            <a href={url} target="_blank" rel="noopener noreferrer">
              Open in Figma
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
