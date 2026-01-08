import { NextRequest } from "next/server";
import { createClient } from "@/shared/lib/supabase/server";
import { successResponse, errorResponse } from "@/app/api/_utils/response";
import { withErrorHandler } from "@/app/api/_utils/api-handler";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const supabase = await createClient();
  const body = await request.json();
  const { redirectTo } = body;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectTo || `${request.nextUrl.origin}/auth/callback`,
    },
  });

  if (error) {
    return errorResponse(error.message, 400);
  }

  return successResponse({ url: data.url });
});
