"use client";

import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import "zoomist/css";
import Zoomist from "zoomist";

const AllPersons = ({ params }) => {
  const [announcement, setAnnouncement] = useState(null);
  const [persons, setPersons] = useState([]);
  const zoomistContainerRef = useRef(null);
  const [zoomistInstance, setZoomistInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewOnly, setViewOnly] = useState(true);
  const [dropboxes, setDropboxes] = useState([]);
  const [publishedDate, setPublishedDate] = useState("");

  const nid = params.nid;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/announcement/read/${nid}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nid }), // You can add any additional data you want to send in the body
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setAnnouncement(data.announcement);
        setPersons(data.persons);
        setPublishedDate(
          data.announcement.published_on
            ? new Date(data.announcement.published_on)
                .toISOString()
                .slice(0, 10)
            : "",
        );
        let parsedDropboxes = [];
        try {
          if (typeof data.announcement.details === "string") {
            parsedDropboxes = JSON.parse(data.announcement.details || "[]");
          } else if (Array.isArray(data.announcement.details)) {
            parsedDropboxes = data.announcement.details;
          }
          console.log("Parsed dropboxes:", parsedDropboxes);
        } catch (error) {
          console.error("Error parsing dropboxes:", error);
        }
        setDropboxes(parsedDropboxes);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (nid) {
      fetchData();
    }
  }, [nid]);

  useEffect(() => {
    if (zoomistContainerRef.current && announcement && !zoomistInstance) {
      const newZoomistInstance = new Zoomist(zoomistContainerRef.current, {
        zoomRatio: 0.2,
        animationDuration: 300,
        minScale: 1,
        maxScale: 3,
        slider: true,
        zoomer: true,
      });
      setZoomistInstance(newZoomistInstance);
    }

    return () => {
      if (zoomistInstance) {
        zoomistInstance.destroy();
      }
    };
  }, [zoomistInstance, announcement]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!announcement) return <div>No announcement data found</div>;

  return (
    <>
      <div className="bg-cream-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid justify-center mb-4">
          <Link
            href={`/announcement/edit/${announcement.nid}`}
            className="w-full px-4 py-2 bg-green-500 text-white block text-center md:w-auto"
          >
            Do you want to edit the announcement? Go ahead and edit one!
          </Link>
        </div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="mt-8">
            <h2 className="text-4xl mb-6 libre-baskerville-regular">
              Announcement
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Left side content */}
              <div className="w-full md:w-1/2">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                  Published medium
                  </label>
                  <textarea
                    name="text"
                    value={announcement.medium || ""}
                    readOnly={viewOnly}
                    rows="4"
                    className={`w-full px-4 font-light py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""}`}
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Published Date
                  </label>
                  <input
                    elements
                    of
                    type="date"
                    name="text"
                    value={publishedDate || ""}
                    readOnly={viewOnly}
                    className={`w-full px-4 font-light py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""}`}
                  ></input>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Text
                  </label>
                  <textarea
                    name="text"
                    value={announcement.text || ""}
                    readOnly={viewOnly}
                    className={`w-full px-4 font-light py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""}`}
                  ></textarea>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <input
                    name="address"
                    type="text"
                    value={announcement.location || ""}
                    readOnly={viewOnly}
                    className={`w-full px-4 py-2 font-light mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Latitude
                    </label>
                    <input
                      name="latitude"
                      type="text"
                      value={announcement.lat || ""}
                      readOnly={viewOnly}
                      className={`w-full px-4 py-2 font-light mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""}`}
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Longitude
                    </label>
                    <input
                      name="longitude"
                      type="text"
                      value={announcement.lon || ""}
                      readOnly={viewOnly}
                      className={`w-full px-4 py-2 font-light mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""}`}
                    />
                  </div>
                </div>

                {/* Dropboxes section */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Dropboxes
                  </label>
                  {dropboxes && dropboxes.length > 0 ? (
                    dropboxes.map((dropbox, dropboxIndex) => (
                      <div
                        key={dropboxIndex}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
                      >
                        <input
                          type="text"
                          value={dropbox.dropdown || dropbox.value || ""}
                          readOnly={viewOnly}
                          className={`w-full px-4 font-light py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${
                            viewOnly
                              ? "disabled cursor-not-allowed border-gray-300"
                              : ""
                          }`}
                        />
                        <input
                          type="text"
                          value={dropbox.input || dropbox.label || ""}
                          readOnly={viewOnly}
                          placeholder="Input type text"
                          className={`w-full px-4 font-light py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${
                            viewOnly
                              ? "disabled cursor-not-allowed border-gray-300"
                              : ""
                          }`}
                        />
                      </div>
                    ))
                  ) : (
                    <p>No dropboxes available</p>
                  )}
                </div>

                {/* Add more fields as needed based on the announcement data structure */}

                {persons.map((person, index) => (
                  <div
                    key={index}
                    className="p-8 border border-black shadow-lg bg-[#F6EFE6] mt-4"
                  >
                    <h2 className="text-2xl mb-6">Person Details</h2>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Title
                      </label>
                      <input
                        name="title"
                        type="text"
                        value={person.title || ""}
                        readOnly={viewOnly}
                        className={`w-full px-4 py-2 font-light mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""}`}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          First Name
                        </label>
                        <input
                          name="first_name"
                          type="text"
                          value={person.first_name || ""}
                          readOnly={viewOnly}
                          className={`w-full px-4 py-2 font-light mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Middle Name
                        </label>
                        <input
                          name="middle_name"
                          type="text"
                          value={person.middle_name || ""}
                          readOnly={viewOnly}
                          className={`w-full px-4 py-2 font-light mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""}`}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Last Name
                        </label>
                        <input
                          name="las_name"
                          type="text"
                          value={person.last_name || ""}
                          readOnly={viewOnly}
                          className={`w-full px-4 py-2 mt-1 font-light border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""}`}
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Person Details
                      </label>
                      <textarea
                        name="party_details"
                        value={person.party_details || ""}
                        readOnly={viewOnly}
                        className={`w-full px-4 py-2 mt-1 font-light border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none ${viewOnly ? "disabled cursor-not-allowed border-gray-300" : ""}`}
                      ></textarea>
                    </div>
                  </div>
                ))}
              </div>

              <div className="w-full md:w-1/2">
                <div ref={zoomistContainerRef} className="zoomist-container">
                  <div className="zoomist-wrapper">
                    <div className="zoomist-image">
                      {announcement.img_path ? (
                        <img
                          src={`data:image/jpeg;base64,${announcement.img_path}`}
                          alt="Announcement Poster"
                          className="w-full h-auto"
                        />
                      ) : (
                        <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                          No image available
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllPersons;
