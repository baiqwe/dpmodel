import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(request: NextRequest) {
  // 1. 先运行 intl 中间件，获取基础 Response (包含语言 Cookie 和重定向逻辑)
  let response = intlMiddleware(request)

  // 2. 检查 Supabase 环境变量是否有效
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // 跳过 Supabase 初始化如果环境变量缺失或为占位符
  const isValidSupabaseConfig =
    supabaseUrl &&
    supabaseAnonKey &&
    !supabaseUrl.includes('placeholder') &&
    supabaseUrl.includes('supabase')

  if (!isValidSupabaseConfig) {
    // 开发模式下跳过 Supabase，直接返回 intl response
    return response
  }

  // 3. 初始化 Supabase 客户端
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          // 同时更新 request 和 response
          // 更新 request 是为了让后续逻辑能读到最新 Cookie
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          // 更新 response 是为了写入浏览器
          // 关键点：我们直接修改 intl 返回的那个 response 对象，而不是创建新的
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })
        },
      },
    }
  )

  // 4. 刷新 Session (这会触发上面的 setAll)
  // 重要：不要在这里写 user 变量的逻辑判断，只负责刷新 Cookie
  await supabase.auth.getUser()

  return response
}

export const config = {
  // ✅ 使用静态宽泛匹配，不依赖动态变量
  // next-intl 中间件内部会自动处理语言匹配
  matcher: ['/((?!api|_next|_vercel|auth/callback|.*\\..*).*)',]
}
