"use client"; // Ensure client-side rendering
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

const DynamicPersonForm = ({ params }) => {
  const [location, setLocation] = useState(null);
  const [persons, setPersons] = useState([]);
  const [viewOnly, setViewOnly] = useState(true);

  const nid = params.aid;

  useEffect(() => {
    if (nid) {
      console.log("Fetching location with nid:", nid);
      const fetchLocation = async () => {
        try {
          console.log("Fetching data from API...");
          const response = await fetch(`/api/location/read/${nid}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ nid }),
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log("Fetched data:", data);

          const locationData = data.location && data.location[0];
          console.log("Extracted location:", locationData);
          const personsData = data.persons || [];
          console.log("Extracted persons:", personsData);

          if (locationData) {
            let parsedDropboxes = [];
            try {
              parsedDropboxes = JSON.parse(locationData.details || "[]");
            } catch (error) {
              console.error("Error parsing dropboxes:", error);
            }

            setLocation({
              ...locationData,
              dropboxes: parsedDropboxes.map((dropbox) => ({
                ...dropbox,
                options: dropbox.options || [],
              })),
            });
            setPersons(personsData);
          } else {
            console.error("Location data is missing in the response");
          }
        } catch (error) {
          console.error("Error fetching location:", error);
        }
      };

      fetchLocation();
    }
  }, [nid]);

  if (!location) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center bg-cream-1 py-8">
      <div className="max-w-4xl w-full space-y-8 px-4 sm:px-6 lg:px-8">
        <div className="mt-4 flex justify-center">
          <Link
            href={`/location/edit/${nid}`}
            className="px-4 py-2 bg-green-500 text-white text-center sm:text-left w-full sm:w-auto"
          >
            Do you want to edit location? Go ahead and edit!
          </Link>
        </div>

        <h1 className="text-4xl libre-baskerville-regular text-center sm:text-left">
          Location
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={location.address || ""}
            readOnly={viewOnly}
            className={`w-full px-4 font-light py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${
              viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""
            }`}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Latitude
            </label>
            <input
              type="text"
              name="latitude"
              value={location.lat || ""}
              readOnly={viewOnly}
              className={`w-full px-4 font-light py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${
                viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""
              }`}
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Longitude
            </label>
            <input
              type="text"
              name="longitude"
              value={location.lon || ""}
              readOnly={viewOnly}
              className={`w-full px-4 font-light py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${
                viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""
              }`}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Dropboxes
          </label>
          {location.dropboxes && location.dropboxes.length > 0 ? (
            location.dropboxes.map((dropbox, dropboxIndex) => (
              <div
                key={dropboxIndex}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
              >
                <input
                  type="text"
                  value={dropbox.dropdown || dropbox.value || ""}
                  readOnly
                  className="w-full px-4 font-light py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none disabled cursor-not-allowed border-gray-300"
                />
                <input
                  type="text"
                  value={dropbox.input || dropbox.label || ""}
                  readOnly
                  placeholder="Input type text"
                  className="w-full px-4 font-light py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none disabled cursor-not-allowed border-gray-300"
                />
              </div>
            ))
          ) : (
            <p>No dropboxes available</p>
          )}
        </div>

        {persons.map((person, index) => (
          <div
            key={index}
            className="p-4 sm:p-8 border border-black shadow-lg bg-[#F6EFE6] mt-4"
          >
            <h2 className="text-2xl mb-6 text-center sm:text-left">
              Person details {index + 1}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={person.title || ""}
                readOnly={viewOnly}
                className={`w-full px-4 py-2 font-light mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${
                  viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""
                }`}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={person.first_name || ""}
                  readOnly={viewOnly}
                  className={`w-full px-4 py-2 font-light mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${
                    viewOnly
                      ? "disabled cursor-not-allowed border-gray-300"
                      : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={person.middle_name || ""}
                  readOnly={viewOnly}
                  className={`w-full px-4 py-2 font-light mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${
                    viewOnly
                      ? "disabled cursor-not-allowed border-gray-300"
                      : ""
                  }`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={person.last_name || ""}
                  readOnly={viewOnly}
                  className={`w-full px-4 py-2 font-light mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${
                    viewOnly
                      ? "disabled cursor-not-allowed border-gray-300"
                      : ""
                  }`}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Person Details
              </label>
              <textarea
                name="details"
                value={person.party_details || ""}
                readOnly={viewOnly}
                className={`w-full px-4 py-2 mt-1 font-light border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${
                  viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""
                }`}
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicPersonForm;
