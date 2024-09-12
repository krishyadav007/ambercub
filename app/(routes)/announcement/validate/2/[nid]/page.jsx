"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const AddressPage = ({ params }) => {
  const [addresses, setAddresses] = useState([]);

  const nid = params.nid;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [announcement, setAnnouncement] = useState({
    // location: "",
    // latitude: "",
    // longitude: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const announcementResponse = await fetch(
          `/api/announcement/read/${nid}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nid }),
          },
        );

        if (!announcementResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const announcementData = await announcementResponse.json();
        setAnnouncement(announcementData.announcement);

        // Fetch location data
        const locationResponse = await fetch(
          `/api/validation/validate2/${nid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!locationResponse.ok) {
          throw new Error("Error fetching location data");
        }

        const locationData = await locationResponse.json();
        console.log(locationData);
        setAddresses(locationData.validatedData || []);

        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (nid) {
      fetchData();
    }
  }, [nid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className="bg-cream-1 min-h-screen">
        <div className="w-full py-4 px-8 bg-cream-1 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow-md">
            <Link
              href={`/announcement/edit/${announcement.nid}`}
              className="w-full px-4 py-2 bg-cream-3 text-white block text-center md:w-auto"
            >
              edit
            </Link>
            <Link
              href={`/announcement/validate/3/${nid}`}
              className="w-full px-4 py-2 bg-green-500 text-white text-center  hover:bg-green-600"
            >
              validate 3
            </Link>
          </div>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4 bg-[#F0E4D7] border-r border-gray-300">
            <h2 className="text-2xl mb-6">(Address)</h2>
            {/* <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Mediumm
              </label>
              <input
                type="text"
                value={announcement.medium || ""}
                className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                readOnly
              />
            </div> */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={announcement.location || ""}
                className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                readOnly
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lat
                </label>
                <input
                  type="text"
                  value={announcement.lat || ""}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Lon
                </label>
                <input
                  type="text"
                  value={announcement.lon || ""}
                  className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4 bg-[#F6EFE6]">
            <h2 className="text-2xl mb-6">Similar Address</h2>
            {addresses.map((address, index) => (
              <div
                key={index}
                className="mb-6 p-4 border border-red-300 bg-[#FDEDDC]"
              >
                {/* <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Medium
                  </label>
                  <input
                    type="text"
                    value={address.medium || ""}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none cursor-not-allowed"
                    disabled
                  />
                </div> */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address.address || ""}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none cursor-not-allowed"
                    disabled
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Lat
                    </label>
                    <input
                      type="text"
                      value={address.lat || ""}
                      className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none cursor-not-allowed"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Lon
                    </label>
                    <input
                      type="text"
                      value={address.lon || ""}
                      className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none cursor-not-allowed"
                      disabled
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
