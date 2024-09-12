"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const AllPersons = ({ params }) => {
  const [location, setLocation] = useState({
    address: "",
    latitude: "",
    longitude: "",
  });

  const [persons, setPersons] = useState([
    {
      id: 1,
      title: "",
      firstName: "",
      middleName: "",
      lastName: "",
      details: "",
    },
  ]);
  const router = useRouter();
  const handleDelete = async () => {
    // Show confirmation dialog for deleting the location
    const result = await Swal.fire({
      title: "Delete Location",
      text: "Are you sure you want to delted this location?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    });

    // Check if the user confirmed the deletion
    if (result.isConfirmed) {
      try {
        // Perform the delete operation
        const response = await fetch(`/api/location/delete/${nid}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Location deleted successfully",
          });
          router.push("/location/all");
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to delete location.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting Location:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to delete location.",
          icon: "error",
        });
      }
    }
  };

  const [attributes, setAttributes] = useState([]);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await fetch("/api/attribute/location/all", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          setAttributes(data.attributes);
        } else {
          console.error("Error fetching attributes:", data.message);
        }
      } catch (error) {
        console.error("Error fetching attributes:", error);
      }
    };

    fetchAttributes();
  }, []);
  const [pairs, setPairs] = useState([{ id: 1, dropdown: "", input: "" }]);

  const nid = params.aid;

  useEffect(() => {
    if (nid) {
      const fetchData = async () => {
        try {
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
          const personsData = data.persons || [];
          const pairsData = data.pairs || [];

          if (locationData) {
            setLocation({
              address: locationData.address || "",
              latitude: locationData.lat || "",
              longitude: locationData.lon || "",
            });
          } else {
            console.error("Location data is missing in the response");
          }

          if (personsData.length > 0) {
            setPersons(
              personsData.map((person) => ({
                id: person.id,
                title: person.title || "",
                firstName: person.first_name || "",
                middleName: person.middle_name || "",
                lastName: person.last_name || "",
                details: person.party_details || "",
              })),
            );
          }

          if (pairsData.length > 0) {
            setPairs(
              pairsData.map((pair) => ({
                id: pair.id,
                dropdown: pair.dropdown || "",
                input: pair.input || "",
              })),
            );
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [nid]);

  const handleLocationChange = (field, value) => {
    setLocation((prevLocation) => ({
      ...prevLocation,
      [field]: value,
    }));
  };

  const handleInputChange = (id, field, value) => {
    setPersons((prevPersons) =>
      prevPersons.map((person) =>
        person.id === id ? { ...person, [field]: value } : person,
      ),
    );
  };

  const handleRemove = (id) => {
    setPersons((prevPersons) =>
      prevPersons.filter((person) => person.id !== id),
    );
  };

  const addPerson = (event) => {
    event.preventDefault();
    setPersons([...persons, { id: Date.now() }]);
  };

  const addPair = (event) => {
    event.preventDefault();
    const newId = pairs.length ? pairs[pairs.length - 1].id + 1 : 1;
    setPairs([...pairs, { id: newId, dropdown: "", input: "" }]);
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const dataToSave = {
      location,
      persons,
      pairs,
    };

    try {
      const response = await fetch(`/api/location/update/${nid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSave),
      });

      if (response.ok) {
        console.log("Data saved successfully");
        Swal.fire({
          title: "Success!",
          text: "Location data Updated successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        console.error("Failed to save data");
        Swal.fire({
          title: "Error",
          text: "Failed to Update location data",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("An error occurred while saving data", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-cream-1 py-8">
        <div className="max-w-4xl w-full space-y-8 px-4 lg:px-0">
          <form onSubmit={handleSave}>
            <h1 className="text-4xl libre-baskerville-regular mb-2">
              Location
            </h1>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={location.address}
                onChange={(e) =>
                  handleLocationChange("address", e.target.value)
                }
                className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none required"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <input
                  type="text"
                  value={location.latitude}
                  onChange={(e) =>
                    handleLocationChange("latitude", e.target.value)
                  }
                  className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none required"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <input
                  type="text"
                  value={location.longitude}
                  onChange={(e) =>
                    handleLocationChange("longitude", e.target.value)
                  }
                  className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none required"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col items-center py-4">
              <div className="max-w-4xl w-full space-y-4">
                <label className="block text-sm font-medium ">Attribute</label>
                <button
                  onClick={addPair}
                  className="block text-sm font-medium bg-black text-white px-4 py-2 text-center w-full sm:w-auto"
                >
                  Add attributes
                </button>
                {pairs.map((pair, index) => (
                  <div
                    key={pair.id}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2"
                  >
                    <select
                      value={pair.dropdown}
                      onChange={(e) => {
                        const newPairs = [...pairs];
                        newPairs[index].dropdown = e.target.value;
                        setPairs(newPairs);
                      }}
                      className="w-full text-sm font-medium px-4 py-2 border-b border-gray-300 bg-white"
                    >
                      <option value="">Select an attribute</option>
                      {attributes.map((attr) => (
                        <option key={attr.id} value={attr.attribute}>
                          {attr.attribute}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      value={pair.input}
                      onChange={(e) => {
                        const newPairs = [...pairs];
                        newPairs[index].input = e.target.value;
                        setPairs(newPairs);
                      }}
                      placeholder="Input type text"
                      className="w-full px-4 text-sm font-medium py-2 border-b border-gray-300 bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>
            {persons.map((person) => (
              <div key={person.id}>
                <div className="p-8 border border-black shadow-lg bg-[#F6EFE6] mt-2">
                  <h2 className="text-2xl mb-6 text-center sm:text-left">
                    Person details
                  </h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      type="text"
                      value={person.title}
                      onChange={(e) =>
                        handleInputChange(person.id, "title", e.target.value)
                      }
                      className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        value={person.firstName}
                        onChange={(e) =>
                          handleInputChange(
                            person.id,
                            "firstName",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        value={person.middleName}
                        onChange={(e) =>
                          handleInputChange(
                            person.id,
                            "middleName",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        value={person.lastName}
                        onChange={(e) =>
                          handleInputChange(
                            person.id,
                            "lastName",
                            e.target.value,
                          )
                        }
                        className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Person Details
                    </label>
                    <textarea
                      value={person.details}
                      onChange={(e) =>
                        handleInputChange(person.id, "details", e.target.value)
                      }
                      className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                    ></textarea>
                  </div>
                  {persons.length > 1 && (
                    <button
                      onClick={() => handleRemove(person.id)}
                      className="bg-black text-white px-4 py-2 mt-4 w-full sm:w-auto"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                onClick={addPerson}
                className="bg-black text-md w-full sm:w-32 h-12 text-white py-1"
              >
                Add Person
              </button>
            </div>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                type="submit"
                className="bg-[#EAA444] w-5/6 text-xl h-16 text-white"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-500 w-1/6 text-xl h-16 text-white"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AllPersons;
