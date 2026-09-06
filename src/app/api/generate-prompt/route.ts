import { NextRequest, NextResponse } from "next/server";
import { buildOptimizedPrompt } from "@/lib/prompt-builder";

export async function POST(req: NextRequest) {
  try {
    const { idea, targetAI } = await req.json() as { idea: string; targetAI: string };

    if (!idea?.trim() || !targetAI) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const prompt = buildOptimizedPrompt(idea.trim(), targetAI);
    return NextResponse.json({ prompt });
  } catch {
    return NextResponse.json({ error: "Failed to generate prompt. Please try again." }, { status: 500 });
  }
}
