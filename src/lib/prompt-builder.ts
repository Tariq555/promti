/**
 * Prompt construction — the logic behind POST /api/generate-prompt.
 *
 * Extracted from the route handler so it can be unit tested directly.
 * Next.js only permits specific exports from a `route.ts`, and a pure
 * function has no business living behind an HTTP boundary anyway.
 *
 * This is deterministic string templating. No network, no model call.
 */

/** Target models with a bespoke template. Anything else uses the fallback. */
export type TargetAI =
  | "claude"
  | "chatgpt"
  | "gemini"
  | "grok"
  | "mistral"
  | "deepseek";

/** Subject areas the classifier can infer from the user's idea. */
export type Domain =
  | "software development and programming"
  | "writing and content creation"
  | "analysis and research"
  | "the requested task";

const CODE_RE = /\b(code|program|script|function|app|api|build|create|develop|implement|debug|fix)\b/i;
const WRITE_RE = /\b(write|draft|compose|article|email|blog|post|letter|essay|copy|content)\b/i;
const ANALYZE_RE = /\b(analyze|analyse|review|evaluate|assess|compare|examine|research|explain)\b/i;

/**
 * Infer the subject area from the user's idea.
 *
 * Order matters: code wins over writing, writing wins over analysis. An idea
 * matching several categories resolves to the first that hits.
 */
export function classifyDomain(idea: string): Domain {
  if (CODE_RE.test(idea)) return "software development and programming";
  if (WRITE_RE.test(idea)) return "writing and content creation";
  if (ANALYZE_RE.test(idea)) return "analysis and research";
  return "the requested task";
}

/** Rewrite a plain idea into a structured prompt for a specific model. */
export function buildOptimizedPrompt(idea: string, targetAI: string): string {
  const clean = idea.trim();
  const domain = classifyDomain(clean);

  switch (targetAI.toLowerCase()) {
    case "claude":
      return `<role>
You are a world-class expert in ${domain}. You deliver precise, well-structured, and thorough responses.
</role>

<task>
${clean}
</task>

<instructions>
- Think step-by-step before writing your final response
- Be specific and concrete — no vague advice
- Use structured formatting (headers, numbered lists, code blocks) where it improves clarity
- State any assumptions explicitly before proceeding
- Prioritize accuracy and depth over brevity
</instructions>

<output_format>
Provide a complete, well-organized response with:
1. A brief approach overview (1-2 sentences)
2. The main content, fully executed
3. Key caveats or edge cases if relevant
4. Concrete next steps or recommendations
</output_format>`;

    case "chatgpt":
      return `## Role
You are an expert assistant specializing in ${domain}.

## Task
${clean}

## Instructions
1. Carefully read and understand exactly what's being asked
2. Think through the best approach before responding
3. Structure your response with clear Markdown headers and sections
4. Be specific, actionable, and concrete — avoid filler
5. If multiple approaches exist, recommend the best one and explain why briefly

## Output Requirements
- Format: Markdown with organized sections
- Tone: Professional, direct, and helpful
- Length: Comprehensive but focused — no padding
- End with a summary or list of key takeaways`;

    case "gemini":
      return `**Task:** ${clean}

**Your role:** Expert in ${domain}

**Instructions:**
1. Analyze the full request before writing your response
2. Identify all key components and requirements
3. Execute methodically with clear, structured explanations
4. Validate your output against the original request before finishing

**Required output schema:**
- **Overview:** 1-2 sentence summary of your approach
- **Main response:** Detailed, structured content with headers
- **Key points:** Bullet list of the most important takeaways
- **Next steps:** 2-3 actionable recommendations

**Constraints:**
- Be factually precise; show your reasoning
- Use numbered lists for sequential steps, bullets for non-sequential items
- Include concrete examples wherever they improve understanding
- Be thorough but avoid padding`;

    case "grok":
      return `${clean}

I need this for ${domain}. Be direct and practical — skip the intro, give me the actual answer. If there are multiple ways to do this, tell me the best one and explain why in one sentence. Use examples where they clarify. Keep it clean and formatted.`;

    case "mistral":
      return `### Task
${clean}

### Context
Domain: ${domain}

### Requirements
- Be precise and structured — no unnecessary preamble
- Use explicit formatting: headers for sections, bullets for lists, code blocks for code
- State important constraints, trade-offs, or caveats clearly
- Start with the answer, then provide supporting detail

### Output Format
A complete, well-formatted response that directly addresses the task. Include concrete examples. End with the single most critical thing to remember.`;

    case "deepseek":
      return `Task: ${clean}

Domain: ${domain}

Requirements:
- Provide a complete, working solution with clear reasoning
- Include step-by-step breakdown of your approach
- Specify any dependencies, versions, or prerequisites upfront
- Show concrete input/output examples
- Handle edge cases and failure modes explicitly
- Optimize for correctness first, then performance and readability

Output format: Structured sections with headers. For code: full implementation with inline comments on non-obvious logic only.`;

    default:
      return `You are a helpful expert assistant specializing in ${domain}.

Task: ${clean}

Please provide a thorough, well-structured response that:
1. Directly and completely addresses what's being asked
2. Uses clear formatting with headers and bullet points where appropriate
3. Includes concrete examples to illustrate key points
4. Is specific and actionable — avoids vague or generic advice
5. Ends with key takeaways or recommended next steps`;
  }
}
