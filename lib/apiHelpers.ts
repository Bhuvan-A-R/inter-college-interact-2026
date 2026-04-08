import { NextRequest, NextResponse } from "next/server";
import { getAuthSession, AuthPayload } from "@/lib/authCookie";
import { ZodSchema, ZodError } from "zod";

// ── Standard Response Builders ──────────────────────────────────────────────

export function successResponse(data: any, status = 200, message?: string) {
  const result: any = { ...data };
  if (message) result.message = message;
  return NextResponse.json({ success: true, data: result }, { status });
}

export function errorResponse(
  message: string,
  status = 400,
  issues?: unknown[]
) {
  const error: Record<string, unknown> = { message };
  if (issues) error.issues = issues;
  return NextResponse.json({ success: false, error }, { status });
}

// ── Auth Helpers ────────────────────────────────────────────────────────────

export async function requireAuth(): Promise<
  { session: AuthPayload; error?: never } | { session?: never; error: NextResponse }
> {
  const session = await getAuthSession();
  if (!session) {
    return { error: errorResponse("Not authenticated.", 401) };
  }
  return { session };
}

export async function requireAdmin(): Promise<
  { session: AuthPayload; error?: never } | { session?: never; error: NextResponse }
> {
  const result = await requireAuth();
  if (result.error) return result;
  if (result.session.role !== "SUPER_ADMIN") {
    return { error: errorResponse("Forbidden.", 403) };
  }
  return { session: result.session };
}

// ── Body Parser ─────────────────────────────────────────────────────────────

export async function parseBody<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<{ data: T; error?: never } | { data?: never; error: NextResponse }> {
  try {
    const body = await req.json();
    const result = schema.safeParse(body);
    if (!result.success) {
      return {
        error: errorResponse("Invalid input", 400, (result.error as ZodError).issues),
      };
    }
    return { data: result.data };
  } catch {
    return { error: errorResponse("Invalid JSON body.", 400) };
  }
}
