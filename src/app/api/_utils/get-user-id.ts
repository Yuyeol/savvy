/**
 * 임시 User ID
 * Phase 2.4에서 Supabase Auth로 전환 예정
 * RLS 정책 테스트를 위해 사용
 */
export const TEMP_USER_ID = "00000000-0000-0000-0000-000000000001";

/**
 * 현재 사용자 ID를 반환
 * @returns 사용자 ID (현재는 임시 ID 반환)
 */
export function getUserId(): string {
  // TODO: Phase 2.4에서 실제 Auth 세션에서 user_id 가져오기
  return TEMP_USER_ID;
}
