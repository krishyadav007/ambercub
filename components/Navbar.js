"use client";
import Link from "next/link";
import { useState } from "react";
// import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="bg-[#f3efe5] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <span className="text-2xl text-gray-800 cursor-pointer">
            AmberCub
          </span>
        </Link>
        <div className="hidden sm:flex space-x-4 items-center">
          <Link href="/" className="text-gray-800 hover:text-black">
            Home
          </Link>
          <Link href="/location/all" className="text-gray-800 hover:text-black">
            Location
          </Link>
          <Link
            href="/announcement/all"
            className="text-gray-800 hover:text-black"
          >
            Announcement
          </Link>
          <Link href="/alerts/all" className="text-gray-800 hover:text-black">
            Alert
          </Link>
          {/* <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-[#f3efe5] hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 border border-gray-800">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn> */}
        </div>
        <div className="sm:hidden flex items-center">
          {/* <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-[#f3efe5] hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 border border-gray-800">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn> */}
          <button
            className="text-gray-800 hover:text-black focus:outline-none ml-2"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      {showMenu && (
        <div className="sm:hidden mt-4">
          <ul className="space-y-2">
            <li>
              <Link href="/" className="block text-gray-800 hover:text-black">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/location/all"
                className="block text-gray-800 hover:text-black"
              >
                Location
              </Link>
            </li>
            <li>
              <Link
                href="/announcement/all"
                className="block text-gray-800 hover:text-black"
              >
                Announcement
              </Link>
            </li>
            <li>
              <Link
                href="/alerts/all"
                className="block text-gray-800 hover:text-black"
              >
                Alert
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useSession, signOut } from "next-auth/react";

// const Navbar = () => {
//     const router = useRouter();
//     const { data: session, status } = useSession();

//     const handleSignIn = () => {
//         router.push("/signin");
//     };

//     const handleSignOut = async () => {
//         await signOut({ redirect: false });
//     };

//     return (
//         <nav className="flex items-center justify-between p-4 bg-gray-100">
//             <div className="flex-shrink-0">
//                 <h1 className="text-xl text-[#3A1B0F] font-semibold">Bookie</h1>
//             </div>
//             <div className="flex-grow mx-4">
//                 <Search />
//             </div>
//             <div className="flex-shrink-0">
//                 {status === "loading" ? (
//                     <p></p>
//                 ) : status === "authenticated" ? (
//                     <button
//                         onClick={handleSignOut}
//                         className="bg-[#F9F16F] text-[#3A1B0F] px-4 py-2 rounded font-medium"
//                     >
//                         Sign Out
//                     </button>
//                 ) : (
//                     <button
//                         onClick={handleSignIn}
//                         className="bg-[#F9F16F] text-[#3A1B0F] px-4 py-2 rounded font-medium"
//                     >
//                         Sign In
//                     </button>
//                 )}
//             </div>
//         </nav>
//     );
// };

// const Search = () => {
//     const router = useRouter();
//     const [profiles, setProfiles] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [showProfiles, setShowProfiles] = useState(false);

//     const fetchProfiles = async (search = "") => {
//         try {
//             const response = await fetch(`/api/profiles?search=${encodeURIComponent(search)}`);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             setProfiles(data);
//             setShowProfiles(true);
//         } catch (error) {
//             console.error("Error fetching profiles:", error);
//         }
//     };

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//         fetchProfiles(e.target.value);
//     };

//     const handleProfileSelect = (profileId) => {
//         router.push(`/profile/${profileId}`);
//     };

//     return (
//         <div className="relative w-full">
//             <input
//                 type="text"
//                 placeholder="Search profiles by username"
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//                 className="w-full p-2 border rounded bg-white"
//             />
//             {showProfiles && (
//                 <div className="absolute mt-2 w-full bg-white shadow-lg rounded-md z-10">
//                     {profiles.length > 0 ? (
//                         profiles.map((profile) => (
//                             <div
//                                 key={profile.id}
//                                 className="border-b p-2 cursor-pointer hover:bg-gray-100"
//                                 onClick={() => handleProfileSelect(profile.id)}
//                             >
//                                 <div className="flex items-center">
//                                     <img
//                                         src={profile.image}
//                                         alt={profile.name || "Profile"}
//                                         width={40}
//                                         height={40}
//                                         className="rounded-md mr-2"
//                                         onError={(e) => {
//                                             e.target.onerror = null;
//                                         }}
//                                     />
//                                     <div>
//                                         <p className="text-sm text-gray-500">@{profile.username}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="p-2 text-center text-gray-500">No result found</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default function CombinedComponent() {
//     return (
//         <div>
//             <Navbar />
//         </div>
//     );
// }