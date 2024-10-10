"use client";

import React, { useEffect, useState } from "react";

const AllPersons = ({ params }) => {
  const [announcement, setAnnouncement] = useState(null);
  const [persons, setPersons] = useState({ apersons: {}, lpersons: {} });

  const [dropboxes, setDropboxes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showMore, setShowMore] = useState({});
  const [dummyAnnouncements, setDummyAnnouncements] = useState([]);

  const nid = params.nid;

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
        setAnnouncement(data.announcement || {});

        console.log(data);

        let parsedDropboxes = [];
        try {
          if (typeof data.announcement.details === "string") {
            parsedDropboxes = JSON.parse(data.announcement.details || "[]");
          } else if (Array.isArray(data.announcement.details)) {
            parsedDropboxes = data.announcement.details;
          }
        } catch (error) {
          console.error("Error parsing dropboxes:", error);
        }
        setDropboxes(parsedDropboxes);

        const dummyResponse = await fetch(`/api/alerts/send/${nid}`);
        if (!dummyResponse.ok) {
          throw new Error("Failed to fetch dummy data");
        }

        const dummyData = await dummyResponse.json();
        console.log(dummyData);
        setDummyAnnouncements(dummyData.locations || []);
        setPersons({
          apersons: data.persons || {},
          lpersons: dummyData.persons || {},
        });
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

  const sendAlert = async (aid) => {
    console.log(aid);
    console.log(nid);
    try {
      const response = await fetch(`/api/alerts/${nid}/${aid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to send alert");
      }

      alert("Alert sent successfully!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const toggleShowMore = (index) => {
    setShowMore((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!announcement) return <div>No announcement data found</div>;

  const personFields = [
    "title",
    "first_name",
    "middle_name",
    "last_name",
    "party_details",
  ];
  const fields = ["address", "lat", "lon", "dropbox"];

  console.log("Announcement NID:", announcement.nid);
  console.log(
    "Person Data for Announcement:", // persons.apersons[announcement.nid]
    persons.apersons,
  );
  return (
    <div className="bg-cream-1 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl mb-6 libre-baskerville-regular">
          Notice
        </h2>

        <div className="flex">
          {/* Static Announcement Card */}
          <div className="w-[600px] overflow-hidden shadow-md sm:rounded-lg bg-white p-6 h-[500px] flex flex-col">
            <h3 className="text-2xl mb-4">Announcement Details</h3>
            <div className="overflow-y-auto flex-grow">
              {fields.map((field) => (
                <div className="mb-2" key={field}>
                  <strong>
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </strong>{" "}
                  {field === "address"
                    ? announcement.location
                    : field === "dropbox"
                      ? dropboxes.map((dropbox, index) => (
                          <div key={index}>
                            {typeof dropbox === "object" && dropbox !== null
                              ? `${dropbox.dropdown}, ${dropbox.input}`
                              : dropbox}
                          </div>
                        ))
                      : announcement[field]}
                </div>
              ))}

              {showMore["announcement"] && (
                <div className="mt-4">
                  <h4 className="text-xl mb-4">
                    Person Details in Notice
                  </h4>
                  {persons.apersons && Array.isArray(persons.apersons)
                    ? persons.apersons.map((person, personIndex) => (
                        <div key={personIndex}>
                          {personFields.map((field) => (
                            <div className="mb-2" key={field}>
                              <strong>
                                {field.charAt(0).toUpperCase() +
                                  field.slice(1).replace("_", " ")}
                                :
                              </strong>{" "}
                              {person[field] || "No value found"}
                            </div>
                          ))}
                          <hr className="my-4" />
                        </div>
                      ))
                    : "No person data available for this announcement"}
                </div>
              )}
            </div>

            <button
              className="mt-4 text-md font-medium bg-blue-500 text-white px-4 py-2 hover:bg-blue-400 text-center w-full"
              onClick={() => toggleShowMore("announcement")}
            >
              {showMore["announcement"] ? "Show Less" : "Show More"}
            </button>
          </div>

          {/* Scrollable Location Cards */}
          <div className="flex overflow-x-auto space-x-6 ml-6">
            {dummyAnnouncements.map((dummy, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[300px] overflow-hidden shadow-md sm:rounded-lg bg-white p-6 h-[500px] flex flex-col"
              >
                <h3 className="text-2xl mb-4">Location {index + 1}</h3>
                <button
                  className="mb-4 text-md font-medium bg-cream-3 text-black px-4 py-2 hover:bg-[#f3efe9] text-center w-full"
                  onClick={() => sendAlert(dummy.aid)}
                >
                  Send Alert
                </button>
                <div className="overflow-y-auto flex-grow">
                  {fields.map((field) => (
                    <div className="mb-2" key={field}>
                      <strong>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                      </strong>{" "}
                      {field === "dropbox"
                        ? JSON.parse(dummy.details).map((dropbox, i) => (
                            <div key={i}>
                              {`${dropbox.dropdown}, ${dropbox.input}`}
                            </div>
                          ))
                        : dummy[field] || "No value found"}
                    </div>
                  ))}

                  {showMore[index] && (
                    <div className="mt-4">
                      <h4 className="text-xl mb-4">Person Details</h4>
                      {persons.lpersons[dummy.aid] &&
                      Array.isArray(persons.lpersons[dummy.aid])
                        ? persons.lpersons[dummy.aid].map(
                            (person, personIndex) => (
                              <div key={personIndex}>
                                {personFields.map((field) => (
                                  <div className="mb-2" key={field}>
                                    <strong>
                                      {field.charAt(0).toUpperCase() +
                                        field.slice(1).replace("_", " ")}
                                      :
                                    </strong>{" "}
                                    {person[field] || "No value found"}
                                  </div>
                                ))}
                                <hr className="my-4" />
                              </div>
                            ),
                          )
                        : "No person data available for this location"}
                    </div>
                  )}
                </div>

                <button
                  className="mt-4 text-md font-medium bg-blue-500 text-white px-4 py-2 hover:bg-blue-400 text-center w-full"
                  onClick={() => toggleShowMore(index)}
                >
                  {showMore[index] ? "Show Less" : "Show More"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPersons;
