"use client";
import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Swal from "sweetalert2";

const AllPersons = () => {
  const [persons, setPersons] = useState([
    {
      id: 1,
      title: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      party_details: "",
    },
  ]);
  const [base64String, setBase64String] = useState(null);
  const [attributes, setAttributes] = useState([]);
  const [nextId, setNextId] = useState(1);

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await fetch("/api/attribute/announcement/all", {
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

  const [announcement, setAnnouncement] = useState({
    text: "",
  });

  const [medium, setMedium] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [dropboxes, setDropboxes] = useState([
    { id: 1, dropdown: "", input: "" },
  ]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setBase64String(base64String);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      setBase64String(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (!selectedFile) {
      alert("Please upload an image.");
      return;
    }

    if (!medium.trim()) {
      alert("Medium is required fields.");
      return;
    }
    if (!announcement.text.trim()) {
      alert("Text is required fields.");
      return;
    }

    // if (
    //   !isValidCoordinate(location.latitude) ||
    //   !isValidCoordinate(location.longitude)
    // ) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Invalid Coordinates",
    //     text: "Please enter valid latitude and longitude values (e.g., 12.12345678).",
    //   });
    //   return;
    // }

    if (base64String) {
      formData.append("file", base64String);
    }
    formData.append("announcement", JSON.stringify(announcement));
    formData.append("medium", medium);
    formData.append("publishedDate", publishedDate);
    formData.append("address", address);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("dropboxes", JSON.stringify(dropboxes));
    formData.append("persons", JSON.stringify(persons));

    try {
      const response = await fetch("/api/announcement/create", {
        // Replace with your API endpoint
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Notice created successfully",
      });
      console.log(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Notice creation failed",
      });
    }
  };
  const isValidCoordinate = (value) => {
    return true;
  };

  const handleChangePerson = (index, event) => {
    const { name, value } = event.target;
    const newPersons = [...persons];
    newPersons[index][name] = value;
    setPersons(newPersons);
  };

  const handleChangeAnnouncement = (event) => {
    const { name, value } = event.target;
    setAnnouncement({ ...announcement, [name]: value });
  };

  const handleChangeDropdown = (index, event) => {
    const { value } = event.target;
    const newDropboxes = [...dropboxes];
    newDropboxes[index].dropdown = value;
    setDropboxes(newDropboxes);
  };

  const handleChangeInput = (index, event) => {
    const { value } = event.target;
    const newDropboxes = [...dropboxes];
    newDropboxes[index].input = value;
    setDropboxes(newDropboxes);
  };

  const handleAddDropbox = () => {
    const newDropbox = { id: Date.now(), dropdown: "", input: "" };
    setDropboxes([...dropboxes, newDropbox]);
  };

  const addPerson = () => {
    setPersons([
      ...persons,
      {
        id: nextId,
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        party_details: "",
      },
    ]);
    setNextId(nextId + 1);
  };

  const removePerson = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
  };

  return (
    <>
      <div className="flex flex-col items-center bg-cream-1 py-8">
        <div className="max-w-4xl w-full space-y-8 px-4 lg:px-0">
          <div className="mb-4">
            <h2 className="text-4xl mb-6 libre-baskerville-regular mb-2 text-center md:text-left">
              Notice
            </h2>
            <label className="block text-sm font-medium text-gray-700">
            Newspaper
            </label>
            <input
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
              required
            />
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Published Date
            </label>
            <input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
            />
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Image
            </label>

            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-400 p-4 text-center md:text-left mt-4"
              required
            >
              <input {...getInputProps()} required />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="mx-auto" />
              ) : (
                <p>Drag drop some files here, or click to select files</p>
              )}
            </div>
            <label className="block text-sm font-medium text-gray-700 mt-4">
              Text
            </label>
            <textarea
              name="text"
              value={announcement.text}
              onChange={handleChangeAnnouncement}
              className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
              rows="4"
              required
            ></textarea>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <textarea
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none required"
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <input
                  name="latitude"
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  className={`w-full px-4 py-2 mt-1 border-b ${
                    latitude && !isValidCoordinate(latitude)
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-gray-400 focus:ring-0 outline-none`}
                  required
                />
                {latitude && !isValidCoordinate(latitude) && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a valid latitude (e.g., 12.12345678)
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <input
                  name="longitude"
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  className={`w-full px-4 py-2 mt-1 border-b ${
                    longitude && !isValidCoordinate(longitude)
                      ? "border-red-500"
                      : "border-gray-300"
                  } focus:border-gray-400 focus:ring-0 outline-none`}
                  required
                />
                {longitude && !isValidCoordinate(longitude) && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a valid longitude (e.g., 12.12345678)
                  </p>
                )}
              </div>
            </div>
            {dropboxes.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Dropboxes
                </label>
                <button
                  type="button"
                  onClick={handleAddDropbox}
                  className="block bg-black text-white mt-2 px-4 py-2 text-center mb-4 w-full lg:w-auto"
                >
                  Add Dropdown-Input Pair
                </button>
                {dropboxes.map((dropbox, dropboxIndex) => (
                  <div
                    key={dropbox.id}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4"
                  >
                    <select
                      value={dropbox.dropdown}
                      onChange={(e) => handleChangeDropdown(dropboxIndex, e)}
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
                      value={dropbox.input}
                      onChange={(e) => handleChangeInput(dropboxIndex, e)}
                      placeholder="Input type text"
                      className="w-full px-4 py-2 border border-gray-300 bg-white"
                    />
                  </div>
                ))}
              </div>
            )}

            {persons.map((person, personIndex) => (
              <div key={person.id} className="mt-8">
                <div className="p-8 border border-black mt-2 shadow-lg bg-[#F6EFE6]">
                  <h2 className="text-2xl mb-6 text-center md:text-left">
                    Person Details
                  </h2>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Title
                    </label>
                    <input
                      name="title"
                      type="text"
                      value={person.title}
                      onChange={(e) => handleChangePerson(personIndex, e)}
                      className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
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
                        value={person.first_name}
                        onChange={(e) => handleChangePerson(personIndex, e)}
                        className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Middle Name
                      </label>
                      <input
                        name="middle_name"
                        type="text"
                        value={person.middle_name}
                        onChange={(e) => handleChangePerson(personIndex, e)}
                        className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        name="last_name"
                        type="text"
                        value={person.last_name}
                        onChange={(e) => handleChangePerson(personIndex, e)}
                        className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Person Details
                    </label>
                    <textarea
                      name="party_details"
                      value={person.party_details}
                      onChange={(e) => handleChangePerson(personIndex, e)}
                      className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                    ></textarea>
                  </div>

                  <button
                    onClick={() => removePerson(person.id)}
                    className="bg-black text-white px-4 py-2 mt-4 w-full sm:w-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-8">
              <button
                onClick={addPerson}
                type="button"
                className="bg-black text-md w-full sm:w-32 h-16 text-white px-4 py-1"
              >
                Add Person
              </button>
            </div>
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-[#EAA444] w-full sm:w-screen text-xl h-16 text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AllPersons;
