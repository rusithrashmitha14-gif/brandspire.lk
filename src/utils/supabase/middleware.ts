import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // refreshing the auth token
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // protect the /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }

        // Basic RBAC
        const adminOnlyPaths = [
            '/admin/services',
            '/admin/blog',
            '/admin/team',
            '/admin/subscriptions',
            '/admin/clients',
            '/admin/invoices'
        ];

        const isPathAdminOnly = adminOnlyPaths.some(path => request.nextUrl.pathname.startsWith(path));

        if (isPathAdminOnly) {
            const { data: profile } = await supabase
                .from('team')
                .select('is_admin')
                .eq('email', user.email)
                .single();
            
            if (!profile || !profile.is_admin) {
                // Redirect non-admins away from admin-only pages back to admin dashboard
                return NextResponse.redirect(new URL('/admin', request.url))
            }
        }
    }

    // optionally, redirect logged-in users away from /login
    if (request.nextUrl.pathname === '/login' && user) {
         return NextResponse.redirect(new URL('/admin', request.url))
    }

    return supabaseResponse
}
