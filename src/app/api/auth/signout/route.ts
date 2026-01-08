import { createClient } from "@/shared/lib/supabase/server";
import { messageResponse, errorResponse } from "@/app/api/_utils/response";
import { withErrorHandler } from "@/app/api/_utils/api-handler";

export const POST = withErrorHandler(async () => {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return errorResponse(error.message, 400);
  }

  return messageResponse("Successfully signed out");
});
