"use client";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Navbar from "../components/Navbar";
import { useSession } from "next-auth/react";

const LoaderSkeleton = () => {
  return (
    <div className="p-4 max-w-sm mx-auto">
      <div className="animate-pulse">
        <div className="h-40 bg-gray-400 rounded mb-4"></div>
        <div className="h-40 bg-gray-400 rounded"></div>
        <div className="mt-4 h-4 bg-gray-400 rounded w-3/4"></div>
        <div className="mt-2 h-4 bg-gray-400 rounded w-full"></div>
        <div className="mt-2 h-4 bg-gray-400 rounded w-5/6"></div>
      </div>
    </div>
  );
};

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
      <SessionProvider>
      <html lang="en">
        <body className="bg-cream-1">
          <Navbar />
          {loading ? <LoaderSkeleton /> : children}
        </body>
      </html>
    </SessionProvider>
  );
}

// "use client";
// import { useState, useEffect } from "react";
// import { SessionProvider, useSession } from "next-auth/react"; // Updated to use `useSession` if needed
// // import { useSession } from "next-auth/react"
// import { auth } from "@/auth";
// import "./globals.css";
// import Navbar from "../components/Navbar";

// const LoaderSkeleton = () => {
//   return (
//     <div className="p-4 max-w-sm mx-auto">
//       <div className="animate-pulse">
//         <div className="h-40 bg-gray-400 rounded mb-4"></div>
//         <div className="h-40 bg-gray-400 rounded"></div>
//         <div className="mt-4 h-4 bg-gray-400 rounded w-3/4"></div>
//         <div className="mt-2 h-4 bg-gray-400 rounded w-full"></div>
//         <div className="mt-2 h-4 bg-gray-400 rounded w-5/6"></div>
//       </div>
//     </div>
//   );
// };

// export default function RootLayout({ children }) {
//   // const { data: session } = useSession();
//   const [loading, setLoading] = useState(true);
//   // const [session, setSession] = useState(null);

//   useEffect(() => {
//     const fetchSession = async () => {
//       // const sessionData = await auth(); // Fetch the session asynchronously
//       // setSession(sessionData);
//       setLoading(false);
//     };

//     fetchSession();
//   }, []);

//   return (
//     <SessionProvider>
//       <html lang="en">
//         <body>
//           <Navbar />
//           {loading ? <LoaderSkeleton /> : children}
//         </body>
//       </html>
//     </SessionProvider>
//   );
// }
