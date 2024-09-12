"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "zoomist/css";
import Zoomist from "zoomist";

const AnnouncementPage = ({ params }) => {
  const [announcement, setAnnouncement] = useState({
    text: "This is the announcement text.",
  });
  const nid = params.nid;
  const [previewUrl, setPreviewUrl] = useState(null);
  const zoomistContainerRef = useRef(null);
  const [zoomistInstance, setZoomistInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewOnly, setViewOnly] = useState(true);

  const handleTextChange = (event) => {
    setAnnouncement({ ...announcement, text: event.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/announcement/read/${nid}`, {
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
        setAnnouncement(data.announcement);
        setPersons(data.persons);
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
    if (zoomistContainerRef.current && !zoomistInstance) {
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
  }, [zoomistInstance]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow-md">
        <Link
          href={`/announcement/edit/${announcement.nid}`}
          className="w-full px-4 py-2 bg-cream-3 text-white block text-center"
        >
          edit
        </Link>
        <Link
          href={`/announcement/validate/2/${nid}`}
          className="w-full px-4 py-2 bg-green-500 text-white text-center hover:bg-green-600"
        >
          validate 2
        </Link>
      </div>

      <div className="flex flex-col md:flex-row flex-grow">
        <div className="w-full md:w-1/2 p-4 bg-[#F0E4D7]">
          <h2 className="text-lg font-semibold mb-2">Announcement (text)</h2>
          <textarea
            value={announcement.text}
            readOnly={viewOnly}
            onChange={handleTextChange}
            className="w-full h-3/4 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none resize-none"
            placeholder="Enter announcement text"
          ></textarea>
        </div>

        <div className="w-full md:w-1/2 p-4 bg-[#F6EFE6]">
          <h2 className="text-lg font-semibold mb-2">Image</h2>
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
  );
};

export default AnnouncementPage;
