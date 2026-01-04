/**
 * 베이스 경로와 쿼리 파라미터로 URL을 생성합니다.
 * null, undefined, 빈 문자열은 자동으로 필터링됩니다.
 *
 * @param basePath - 베이스 URL 경로 (예: '/api/folders')
 * @param params - 쿼리 파라미터 객체 (최소 1개 이상의 유효한 값 필요)
 * @returns 생성된 URL 문자열
 * @throws {Error} 유효한 파라미터가 하나도 없는 경우
 *
 * @example
 * buildUrlWithParams('/api/folders', {
 *   search: 'test',
 *   sort: null,
 *   order: 'asc'
 * })
 * // 결과: '/api/folders?search=test&order=asc'
 */
export function buildUrlWithParams(
  basePath: string,
  params: Record<string, string | number | boolean | null | undefined>
): string {
  // null, undefined, 빈 문자열 제거
  const validParams: Record<string, string | number | boolean> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value != null && value !== "") {
      validParams[key] = value;
    }
  }

  // 유효한 파라미터가 없으면 에러
  if (Object.keys(validParams).length === 0) {
    throw new Error(
      `buildUrlWithParams: 최소 1개 이상의 유효한 파라미터가 필요합니다. (basePath: ${basePath})`
    );
  }

  const searchParams = new URLSearchParams(
    validParams as Record<string, string>
  );

  return `${basePath}?${searchParams.toString()}`;
}
