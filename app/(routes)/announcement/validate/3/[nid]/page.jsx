"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const PersonAddressPage = ({ params }) => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      firstName: "Ram",
      middleName: "Kumar",
      lastName: "Jain",
      details: "Ram's details go here.",
    },
    {
      id: 2,
      firstName: "John",
      middleName: "D.",
      lastName: "Doe",
      details: "John's details go here.",
    },
  ]);
  const nid = params.nid;
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [announcement, setAnnouncement] = useState({});

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
        setPerson(data.persons);
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow-md">
        <Link
          href={`/announcement/edit/${announcement.nid}`}
          className="w-full px-4 py-2 bg-cream-3 text-white block text-center"
        >
          Edit
        </Link>
        <Link
          href={`/announcement/validate/2/${nid}`}
          className="w-full px-4 py-2 bg-green-500 text-white text-center hover:bg-green-600"
        >
          Validate 2
        </Link>
      </div>
        <div className="w-full py-4 px-8 bg-cream-1 text-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white shadow-md">
            <Link
              href={`/announcement/edit/${announcement.nid}`}
              className="w-full px-4 py-2 bg-blue-500 text-white block text-center md:w-auto"
            >
              Edit
            </Link>
            <Link
              href={`alerts//announcement/${nid}`}
              className="w-full px-4 py-2 bg-green-500 text-white text-center hover:bg-green-600"
            >
              Alert
            </Link>
          </div>
        </div>

        <div className="flex flex-col">
          {person.map((individualPerson, index) => (
            <div key={index} className="flex flex-row">
              {/* Left Section - Individual Person */}
              <div className="w-1/2 p-4 bg-[#F0E4D7] border-r border-gray-300">
                <div className="">
                  <h2 className="text-2xl mb-6">Person {index + 1}</h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      value={individualPerson.first_name}
                      type="text"
                      className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Middle Name
                    </label>
                    <input
                      value={individualPerson.middle_name}
                      type="text"
                      className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      value={individualPerson.last_name}
                      type="text"
                      className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Right Section - Summary for this person */}
              <div className="w-1/2 p-4 bg-[#FDEDDC]">
                <h2 className="text-2xl mb-4">Person {index + 1} Summary</h2>
                <div className="mb-4">
                  <h3 className="text-xl mb-2">First Names</h3>
                  <div className="p-2 border border-gray-300 bg-[#F0E4D7]">
                    {persons.map((p, i) => (
                      <div key={i} className="mb-1">
                        {p.firstName}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl mb-2">Middle Names</h3>
                  <div className="p-2 border border-gray-300 bg-[#F0E4D7]">
                    {persons.map((p, i) => (
                      <div key={i} className="mb-1">
                        {p.middleName}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <h3 className="text-xl mb-2">Last Names</h3>
                  <div className="p-2 border border-gray-300 bg-[#F0E4D7]">
                    {persons.map((p, i) => (
                      <div key={i} className="mb-1">
                        {p.lastName}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PersonAddressPage;
