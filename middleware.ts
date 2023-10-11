import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// This function can be marked `async` if using `await` inside
export async function middleware(req: NextRequest) {

    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET})

    //Informacion sobre el usuario
    // console.log({session});

    if (
        req.nextUrl.pathname.startsWith('/checkout/address') ||
        req.nextUrl.pathname.startsWith('/checkout/summary') ||
        req.nextUrl.pathname.startsWith('/admin')
    ) 
    {

        if ( !session ) {
            const requestedPage = req.nextUrl.pathname;
            const url = req.nextUrl.clone();
            url.pathname = `/auth/login`;
            url.search = `p=${ requestedPage }`;

            return NextResponse.redirect( url );
    }

        if (req.nextUrl.pathname.startsWith('/admin')) {

            const validRoles = ['admin', 'super-user', 'SEO'];

                if ( !validRoles.includes( session.user.role )) {
                    return NextResponse.redirect(new URL('/', req.url));
                }

            return NextResponse.next();
        }
    }

 // APIs
if (req.nextUrl.pathname.startsWith('/api/admin')) {
        if (!session) {
            return new Response(JSON.stringify({ message: 'No autorizado' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const validRoles = ['admin', 'super-user', 'SEO'];

        if (!validRoles.includes(session.user.role)) {
            return new Response(JSON.stringify({ message: 'No autorizado' }), {
                status: 401,
                headers: {
                'Content-Type': 'application/json',
                },
            });
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/checkout/address', '/checkout/summary', '/admin/:path*', '/api/admin/:path*'],
};
