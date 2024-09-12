"use client";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import Link from "next/link";

const PersonAddressPage = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      firstName: "Prince",
      middleName: "",
      lastName: "Jain",
      details: "Prince's details go here.",
    },
    {
      id: 2,
      firstName: "John",
      middleName: "D.",
      lastName: "Doe",
      details: "John's details go here.",
    },
  ]);

  return (
    <>
      <Navbar />
      <div className="bg-cream-1 min-h-screen">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4 bg-[#F0E4D7] border-r border-gray-300">
            <h2 className="text-2xl mb-6">(Person)</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4 bg-[#F6EFE6]">
            <h2 className="text-2xl mb-6">Similar Person</h2>
            {persons.map((person, index) => (
              <div
                key={person.id}
                className="mb-6 p-4 border border-red-300 bg-[#FDEDDC]"
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={person.firstName}
                    onChange={(e) => {
                      const newPersons = [...persons];
                      newPersons[index].firstName = e.target.value;
                      setPersons(newPersons);
                    }}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none cursor-not-allowed"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    value={person.middleName}
                    onChange={(e) => {
                      const newPersons = [...persons];
                      newPersons[index].middleName = e.target.value;
                      setPersons(newPersons);
                    }}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none cursor-not-allowed"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={person.lastName}
                    onChange={(e) => {
                      const newPersons = [...persons];
                      newPersons[index].lastName = e.target.value;
                      setPersons(newPersons);
                    }}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none cursor-not-allowed"
                    disabled
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Details
                  </label>
                  <textarea
                    value={person.details}
                    onChange={(e) => {
                      const newPersons = [...persons];
                      newPersons[index].details = e.target.value;
                      setPersons(newPersons);
                    }}
                    className="w-full px-4 py-2 mt-1 border border-gray-300 focus:border-gray-400 focus:ring-0 outline-none cursor-not-allowed"
                    disabled
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Validate button added here, between the two main sections */}
      </div>
    </>
  );
};

export default PersonAddressPage;
