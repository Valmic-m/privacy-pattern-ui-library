"use client";

import { useState, useCallback, useEffect, CSSProperties } from "react";
import { cn } from "@/lib/utils";
import styles from "./grid-line.module.css";

const EXTENSIONS = ["webp", "png", "jpg"] as const;

function GridLine({
  direction,
  className,
  size = 6,
}: {
  direction: "horizontal" | "vertical";
  className?: string;
  size?: number;
}) {
  return (
    <div
      aria-hidden
      data-direction={direction}
      className={cn(styles.gridLine, className)}
      style={{ "--size": `${size}px` } as CSSProperties}
    />
  );
}

interface ExampleScreenshotProps {
  exampleId: string;
  alt: string;
  className?: string;
  onMissing?: (exampleId: string) => void;
}

export function ExampleScreenshot({
  exampleId,
  alt,
  className,
  onMissing,
}: ExampleScreenshotProps) {
  const [extensionIndex, setExtensionIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const currentExtension = EXTENSIONS[extensionIndex];
  const imageSrc = `/images/examples/${exampleId}.${currentExtension}`;

  // Notify parent when screenshot is confirmed missing
  useEffect(() => {
    if (hasError && onMissing) {
      onMissing(exampleId);
    }
  }, [hasError, exampleId, onMissing]);

  const handleError = useCallback(() => {
    if (extensionIndex < EXTENSIONS.length - 1) {
      // Try next extension
      setExtensionIndex((prev) => prev + 1);
    } else {
      // All extensions failed
      setHasError(true);
    }
  }, [extensionIndex]);

  if (hasError) {
    return (
      <div
        aria-label="Missing screenshot"
        className={cn("relative rounded-md bg-muted/50", className)}
      >
        <GridLine direction="vertical" className="absolute top-0 left-0 h-4" />
        <GridLine direction="horizontal" className="absolute top-0 left-0 w-4" />
        <GridLine direction="vertical" className="absolute top-0 right-0 h-4" />
        <GridLine direction="horizontal" className="absolute top-0 right-0 w-4" />
        <GridLine direction="vertical" className="absolute bottom-0 left-0 h-4" />
        <GridLine direction="horizontal" className="absolute bottom-0 left-0 w-4" />
        <GridLine direction="vertical" className="absolute bottom-0 right-0 h-4" />
        <GridLine direction="horizontal" className="absolute bottom-0 right-0 w-4" />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      className={cn(
        "w-full rounded-md border border-border object-cover",
        className
      )}
    />
  );
}

