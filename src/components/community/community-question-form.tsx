"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type SubmissionStatus = "idle" | "success" | "error";

export function CommunityQuestionForm() {
  const [question, setQuestion] = useState("");
  const [designContext, setDesignContext] = useState("");
  const [platform, setPlatform] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];

    if (!question.trim()) {
      newErrors.push("Question is required.");
    }
    if (!designContext.trim()) {
      newErrors.push("Design context or scenario is required.");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      setStatus("error");
      return;
    }

    // Simulate successful submission (no backend)
    setStatus("success");
    setErrors([]);
  };

  const handleReset = () => {
    setQuestion("");
    setDesignContext("");
    setPlatform("");
    setRole("");
    setStatus("idle");
    setErrors([]);
  };

  if (status === "success") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Submit a Community Question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="text-sm text-foreground">
              Thank you for submitting your question. It is currently under
              review and may be published if approved.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4"
            onClick={handleReset}
          >
            Submit another question
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Community Question</CardTitle>
        <CardDescription>
          Submit a design-related question to the community. Approved questions
          will be posted publicly, where other designers can contribute
          responses and perspectives.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="community-question">
              Question <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="community-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question..."
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="community-context">
              Design context or scenario <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="community-context"
              value={designContext}
              onChange={(e) => setDesignContext(e.target.value)}
              placeholder="Describe the design context or scenario..."
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="community-platform">
              Platform or product type (optional)
            </Label>
            <Input
              id="community-platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              placeholder="e.g., Mobile app, Web dashboard, E-commerce"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="community-role">
              Role / experience level (optional)
            </Label>
            <Input
              id="community-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., Junior Designer, Senior Product Designer"
            />
          </div>

          {status === "error" && errors.length > 0 && (
            <div className="rounded-lg bg-destructive/10 p-3">
              <p className="text-sm text-destructive">
                Please complete all required fields before submitting.
              </p>
            </div>
          )}

          <Button type="submit">Submit Question</Button>
        </form>
      </CardContent>
    </Card>
  );
}
