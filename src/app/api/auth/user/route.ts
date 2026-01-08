import { createClient } from "@/shared/lib/supabase/server";
import { successResponse, errorResponse } from "@/app/api/_utils/response";
import { withErrorHandler } from "@/app/api/_utils/api-handler";

export const dynamic = "force-dynamic";

export const GET = withErrorHandler(async () => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return errorResponse(error.message, 401);
  }

  if (!user) {
    return errorResponse("Not authenticated", 401);
  }

  return successResponse({ user });
});
