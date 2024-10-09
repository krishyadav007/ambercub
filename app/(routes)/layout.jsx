"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';


export default function RootLayout({ children }) {
    const guest_pages = ["/"]
    const { data: session, status } = useSession();
    const EmailId = session?.user?.email;
    const router = useRouter()
    const currentPage = usePathname();


  useEffect(() => {
    if (status === "unauthenticated" && (!guest_pages.includes(currentPage))) {
        router.push('/signin')
    }
  }, [status]);
  return (status === "authenticated" || (guest_pages.includes(currentPage))) ? ({...children}) : (<></>) 
//   return status === "authenticated" && ? ({children}) : (<></>) 
}