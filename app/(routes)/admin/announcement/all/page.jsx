"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Swal from "sweetalert2";

const AllAnnouncements = () => {
  const { data: session, status } = useSession();
  const EmailId = session?.user?.email;
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL.split(";");

  const [isAdmin, setIsAdmin] = useState(false);
  console.log(EmailId,ADMIN_EMAIL);
  useEffect(() => {
    if (EmailId) {
      setIsAdmin(ADMIN_EMAIL.includes(EmailId));
    }
  }, []);

  const [announcements, setAnnouncements] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Swal.fire({
      title: "Loading...",
      text: "Fetching Announcements",
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const fetchAnnouncements = async () => {
      try {
        // setIsLoading(true);
        const response = await fetch("/api/admin/announcement/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setAnnouncements(data.location || []);
        Swal.close();
      } catch (error) {
        console.error("Error fetching announcements:", error);
        setError("Failed to fetch announcements");
        Swal.fire({
          title: "Error",
          text: "Failed to fetch Announcements",
          icon: "error",
        });
      }
    };

    fetchAnnouncements();
  }, []);

  if (error) return <div>Error: {error}</div>;

  if (!isAdmin) {
    return (
      <div className="container mx-auto p-4">
        Access denied. Admin privileges required.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center bg-cream-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-8">
          <div className="mt-4">
            <Link
              href={`/announcement/create`}
              className="block text-lg font-medium bg-cream-3 text-black px-4 py-2 hover:bg-[#f3efe9] text-center w-full sm:w-auto"
            >
              Add Announcement
            </Link>
          </div>
          {announcements.length > 0 ? (
            announcements.map((announcement) => (
              <div
                key={announcement.aid}
                className="p-4 sm:p-8 border border-black shadow-lg bg-[#F6EFE6]"
              >
                <h1 className="text-3xl sm:text-4xl libre-baskerville-regular mb-2 text-center sm:text-left">
                  Announcement
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 ">
                      Published medium
                    </label>
                    <input
                      type="text"
                      value={announcement.medium}
                      readOnly
                      className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Published Date
                    </label>
                    <input
                      type="text"
                      value={announcement.published_on}
                      readOnly
                      className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    value={announcement.location}
                    readOnly
                    className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none "
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Latitude
                    </label>
                    <input
                      type="text"
                      value={announcement.lat}
                      readOnly
                      className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Longitude
                    </label>
                    <input
                      type="text"
                      value={announcement.lon}
                      readOnly
                      className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none "
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/announcement/view/${announcement.nid}`}
                    className="block text-sm font-medium bg-black text-white px-4 py-2 text-center w-full sm:w-auto"
                  >
                    View
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div>No announcements found.</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllAnnouncements;
