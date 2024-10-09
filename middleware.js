import { NextResponse } from 'next/server'
import { auth } from "@/auth"

export async function middleware(request) {
    const session = await auth();
    console.log(session)
//   if (request.nextUrl.pathname.startsWith('/api')) {
//     if(!(session !== null)) {
//         return new Response(JSON.stringify({ message: "You are not authorized to view this " }), {
//           status: 401,
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//     }
//   }
 
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  }
}