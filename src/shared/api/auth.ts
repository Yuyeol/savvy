import {
  googleSignInRequestSchema,
  googleSignInResponseSchema,
  userResponseSchema,
  messageResponseSchema,
  type GoogleSignInRequest,
  type User,
} from "@/shared/api/schemas/auth.schema";
import { fetcher } from "@/shared/utils/api/fetcher";

// POST /api/auth/google (구글 로그인)
export async function signInWithGoogle(
  redirectTo?: string
): Promise<{ url: string }> {
  const request: GoogleSignInRequest = { redirectTo };
  const validated = googleSignInRequestSchema.parse(request);

  const url = "/api/auth/google";
  const response = await fetcher(url, googleSignInResponseSchema, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validated),
  });

  // OAuth URL로 리다이렉트
  if (response.data.url) {
    window.location.href = response.data.url;
  }

  return response.data;
}

// POST /api/auth/signout (로그아웃)
export async function signOut(): Promise<void> {
  const url = "/api/auth/signout";
  await fetcher(url, messageResponseSchema, {
    method: "POST",
  });
}

// GET /api/auth/user (현재 사용자 조회)
export async function getUser(): Promise<User | null> {
  try {
    const url = "/api/auth/user";
    const response = await fetcher(url, userResponseSchema);
    return response.data.user;
  } catch {
    // 401 에러는 로그인하지 않은 상태이므로 null 반환
    return null;
  }
}

// Re-export types
export type { User };
