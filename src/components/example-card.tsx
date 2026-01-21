import { ExternalLink, Figma } from "lucide-react";
import type { Example } from "@/types/catalog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExampleScreenshot } from "@/components/example-screenshot";

interface ExampleCardProps {
  example: Example;
  onMissingScreenshot?: (exampleId: string) => void;
}

/**
 * Parse URL field which may contain multiple URLs separated by whitespace
 */
function parseUrls(urlString: string): string[] {
  return urlString
    .split(/\s+/)
    .map((u) => u.trim())
    .filter((u) => u.length > 0 && u.startsWith("http"));
}

export function ExampleCard({ example, onMissingScreenshot }: ExampleCardProps) {
  const urls = parseUrls(example.url);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{example.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ExampleScreenshot
          exampleId={example.id}
          alt={`Screenshot of ${example.name}`}
          className="aspect-video"
          onMissing={onMissingScreenshot}
        />
        <div className="flex flex-row gap-2">
          {urls.map((url, idx) => (
            <Button
              key={url}
              variant="outline"
              size="sm"
              asChild
              className="gap-1.5 text-xs"
            >
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3 w-3" />
                {urls.length > 1 ? `Source ${idx + 1}` : "View source"}
              </a>
            </Button>
          ))}
          {example.figmaTemplateUrl && (
            <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs">
              <a
                href={example.figmaTemplateUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Figma className="h-3 w-3" />
                Figma template
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

