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

export function FAQSubmissionForm() {
  const [question, setQuestion] = useState("");
  const [context, setContext] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!question.trim()) {
      setError("Please complete all required fields before submitting.");
      setStatus("error");
      return;
    }

    // Simulate successful submission (no backend)
    setStatus("success");
  };

  const handleReset = () => {
    setQuestion("");
    setContext("");
    setRole("");
    setEmail("");
    setStatus("idle");
    setError("");
  };

  if (status === "success") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Submit an FAQ Question</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="text-sm text-foreground">
              Thank you for your submission. Your question has been received and
              will be reviewed. If selected, it may be added to the FAQ.
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
        <CardTitle>Submit an FAQ Question</CardTitle>
        <CardDescription>
          Have a question about privacy-respectful interface design or about
          this library? Submit it below. Questions are reviewed and may be added
          to the FAQ if they are broadly relevant to the design community.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="faq-question">
              Question <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="faq-question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question..."
              required
              aria-required="true"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="faq-context">Context or use case (optional)</Label>
            <Textarea
              id="faq-context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Describe the context or scenario..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="faq-role">Role / background (optional)</Label>
            <Input
              id="faq-role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g., UX Designer, Product Manager"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="faq-email">Email (optional; for follow-up only)</Label>
            <Input
              id="faq-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
          </div>

          {status === "error" && error && (
            <div className="rounded-lg bg-destructive/10 p-3">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <Button type="submit">Submit Question</Button>
        </form>
      </CardContent>
    </Card>
  );
}
