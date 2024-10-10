import { NextResponse } from 'next/server'
import { auth } from "@/auth"

export async function middleware(request) {
    const session = await auth();
  if (request.nextUrl.pathname.startsWith('/api')) {
    if(!(session !== null)) {
        return new Response(JSON.stringify({ message: "You are not authorized to view this " }), {
          status: 401,
          headers: {
            "Content-Type": "application/json",
          },
        });
    }
  }

}