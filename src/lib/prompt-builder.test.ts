import { describe, test, expect } from "vitest";
import { buildOptimizedPrompt, classifyDomain } from "@/lib/prompt-builder";

describe("classifyDomain", () => {
  test("returns the coding domain when the idea mentions building software", () => {
    // Arrange
    const idea = "build an API for user accounts";

    // Act
    const domain = classifyDomain(idea);

    // Assert
    expect(domain).toBe("software development and programming");
  });

  test("returns the writing domain for content tasks", () => {
    expect(classifyDomain("draft a blog post about coffee")).toBe(
      "writing and content creation",
    );
  });

  test("returns the analysis domain for research tasks", () => {
    expect(classifyDomain("compare these two vendors")).toBe(
      "analysis and research",
    );
  });

  test("falls back to the generic domain when nothing matches", () => {
    expect(classifyDomain("a poem about the sea")).toBe("the requested task");
  });

  test("prefers code over writing when an idea matches both", () => {
    // "write" and "code" both match. Code is checked first, so it wins.
    // This documents the precedence rather than leaving it accidental.
    expect(classifyDomain("write code for a parser")).toBe(
      "software development and programming",
    );
  });

  test("matches keywords regardless of case", () => {
    expect(classifyDomain("DEBUG this crash")).toBe(
      "software development and programming",
    );
  });

  test("requires whole words, so 'scripted' does not count as 'script'", () => {
    // The regexes are \b-anchored. Without that, ordinary prose would be
    // misclassified constantly.
    expect(classifyDomain("a scripted sequence")).toBe("the requested task");
  });
});

describe("buildOptimizedPrompt", () => {
  const idea = "build a login form";

  test("wraps the idea in XML tags for Claude", () => {
    const prompt = buildOptimizedPrompt(idea, "claude");

    expect(prompt).toContain("<role>");
    expect(prompt).toContain("<task>");
    expect(prompt).toContain("<output_format>");
    expect(prompt).toContain(idea);
  });

  test("uses Markdown headers for ChatGPT", () => {
    const prompt = buildOptimizedPrompt(idea, "chatgpt");

    expect(prompt).toContain("## Role");
    expect(prompt).toContain("## Task");
    expect(prompt).not.toContain("<role>");
  });

  test("uses bold labels for Gemini", () => {
    expect(buildOptimizedPrompt(idea, "gemini")).toContain("**Task:**");
  });

  test("puts the raw idea first for Grok, with no preamble", () => {
    // Grok's template is deliberately terse -- the idea leads.
    expect(buildOptimizedPrompt(idea, "grok").startsWith(idea)).toBe(true);
  });

  test("uses h3 sections for Mistral", () => {
    expect(buildOptimizedPrompt(idea, "mistral")).toContain("### Task");
  });

  test("uses a plain labelled layout for DeepSeek", () => {
    expect(buildOptimizedPrompt(idea, "deepseek")).toContain("Task: " + idea);
  });

  test("falls back to a generic template for an unknown model", () => {
    const prompt = buildOptimizedPrompt(idea, "some-model-that-does-not-exist");

    expect(prompt).toContain("You are a helpful expert assistant");
    expect(prompt).toContain(idea);
  });

  test("matches the model name regardless of case", () => {
    expect(buildOptimizedPrompt(idea, "CLAUDE")).toBe(
      buildOptimizedPrompt(idea, "claude"),
    );
  });

  test("trims surrounding whitespace from the idea", () => {
    const prompt = buildOptimizedPrompt("   spaced out   ", "claude");

    expect(prompt).toContain("spaced out");
    expect(prompt).not.toContain("   spaced out   ");
  });

  test("embeds the classified domain in the prompt", () => {
    const prompt = buildOptimizedPrompt("compare two databases", "chatgpt");

    expect(prompt).toContain("analysis and research");
  });

  test("classifies on the trimmed idea, not the raw input", () => {
    // Guards the ordering inside the function: trim must happen before
    // classification, or leading whitespace could change the domain.
    expect(buildOptimizedPrompt("  debug this  ", "grok")).toContain(
      "software development and programming",
    );
  });

  test("produces a different prompt for each supported model", () => {
    const models = ["claude", "chatgpt", "gemini", "grok", "mistral", "deepseek"];

    const prompts = models.map((m) => buildOptimizedPrompt(idea, m));

    expect(new Set(prompts).size).toBe(models.length);
  });

  test("returns a usable prompt even when the idea is only whitespace", () => {
    // The route rejects this before calling, but the function must not throw
    // if it is ever called directly.
    expect(() => buildOptimizedPrompt("   ", "claude")).not.toThrow();
  });
});
