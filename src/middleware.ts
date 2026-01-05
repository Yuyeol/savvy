import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("🔵 Middleware 실행:", request.nextUrl.pathname);

  // API 경로는 건너뛰기
  if (request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  console.log("👤 User:", user ? user.email : "없음");

  // 로그인 페이지는 항상 접근 가능
  if (request.nextUrl.pathname === "/login") {
    // 이미 로그인한 경우 홈으로 리다이렉트
    if (user) {
      console.log("✅ 이미 로그인 -> 홈으로");
      return NextResponse.redirect(new URL("/", request.url));
    }
    console.log("✅ 로그인 페이지 접근 허용");
    return response;
  }

  // auth 콜백은 항상 접근 가능
  if (request.nextUrl.pathname.startsWith("/auth/callback")) {
    console.log("✅ Auth 콜백 허용");
    return response;
  }

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  if (!user) {
    console.log("❌ 비로그인 -> /login 리다이렉트");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("✅ 로그인됨 -> 페이지 허용");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
