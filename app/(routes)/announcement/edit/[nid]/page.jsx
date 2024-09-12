"use client";
import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import "zoomist/css";
import Zoomist from "zoomist";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const AllPersons = ({ params }) => {
  const [persons, setPersons] = useState([
    {
      id: "",
      title: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      party_details: "",
    },
  ]);
  const isValidCoordinate = (value) => {
    return true;
  };

  const nid = params.nid;
  const [announcement, setAnnouncement] = useState({
    text: "",
  });

  const zoomistContainerRef = useRef(null);
  const [zoomistInstance, setZoomistInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const [attributes, setAttributes] = useState([]);
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
  const [base64String, setBase64String] = useState(null);

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
        console.log(data);
        setAnnouncement(data.announcement);
        setPersons(data.persons);
        setMedium(data.announcement.medium || "");

        setPublishedDate(
          data.announcement.published_on
            ? new Date(data.announcement.published_on)
                .toISOString()
                .slice(0, 10)
            : "",
        );
        // } catch (error) {
        //   console.error("Error fetching data:", error);
        // }
        setAddress(data.announcement.location || "");
        setLatitude(data.announcement.lat || "");
        setLongitude(data.announcement.lon || "");
        setDropboxes(
          data.announcement.details
            ? JSON.parse(data.announcement.details)
            : [],
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (nid) {
      fetchData();
    }
  }, [nid]);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    // if (!selectedFile) {
    //   alert("Please upload an image.");
    //   return;
    // }

    if (!medium.trim()) {
      alert("Medium is required fields.");
      return;
    }
    if (!announcement.text.trim()) {
      alert("Text is required fields.");
      return;
    }
    if (!isValidCoordinate(latitude) || !isValidCoordinate(longitude)) {
      alert(
        "Please enter valid latitude and longitude values (e.g., 12.12345678).",
      );
      return;
    }

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
      const method = nid ? "PUT" : "POST";

      const response = await fetch(`/api/announcement/update/${nid}`, {
        method: method,
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.persons && Array.isArray(data.persons)) {
        setPersons((prevPersons) =>
          prevPersons.map((person, index) => ({
            ...person,
            id: data.persons[index]?.id ?? person.id,
          })),
        );
      }

      Swal.fire({
        title: "Success!",
        text: "Announcement data Updated successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      console.log(data);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to Update Announcement data",
        icon: "error",
      });
    }
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
    setPersons((prevPersons) => [
      ...prevPersons,
      {
        id: -1,
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        party_details: "",
      },
    ]);
  };

  const removePerson = (id) => {
    setPersons(persons.filter((person) => person.id !== id));
  };

  const router = useRouter();
  const handleDelete = async () => {
    // Show confirmation dialog for deleting the location
    const result = await Swal.fire({
      title: "Delete Announcement",
      text: "Are you sure you want to delted this Announcement?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it!",
    });

    // Check if the user confirmed the deletion
    if (result.isConfirmed) {
      try {
        console.log("Attempting to delete Announcement with aid:", nid);

        // Perform the delete operation
        const response = await fetch(`/api/announcement/delete/${nid}`, {
          method: "DELETE",
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Announcement deleted successfully",
          });
          router.push("/announcement/all");
        } else {
          Swal.fire({
            title: "Error",
            text: "Failed to delete Announcement.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Error deleting Announcement:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to delete location.",
          icon: "error",
        });
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-cream-1 py-8">
        <div className="max-w-4xl w-full space-y-8 px-4 lg:px-0">
          <div className="mt-4 w-full">
            <Link
              href={`/announcement/validate/1/${nid}`}
              className="w-full px-4 py-2 bg-green-500 text-white block text-center md:w-auto "
            >
              Do you want to Validate announcement? Go ahead and Validate 1!
            </Link>
          </div>

          <div className="mb-4">
            <h2 className="text-4xl mb-6 libre-baskerville-regular mb-2 text-center md:text-left">
              Announcement
            </h2>

            <label className="block text-sm font-medium text-gray-700">
              Medium
            </label>
            <input
              type="text"
              value={medium}
              onChange={(e) => setMedium(e.target.value)}
              className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
            />

            <label className="block text-sm font-medium text-gray-700 mt-4">
              Published Date
            </label>
            <input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none mb-2"
            />

            <h2 className="block text-sm font-medium text-gray-700 mt-4 mb-2">
              Image
            </h2>
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

            <h2 className="block text-sm font-medium text-gray-700 mt-4 ">
              Change Image
            </h2>
            <div
              {...getRootProps()}
              className="border-dashed border-2 border-gray-400 p-4 text-center md:text-left mt-4"
            >
              <input {...getInputProps()} />
              {previewUrl ? (
                <img src={previewUrl} alt="Preview" className="mx-auto" />
              ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
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
                <div key={dropboxIndex} className="mb-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                      value={dropbox.input}
                      onChange={(event) =>
                        handleChangeInput(dropboxIndex, event)
                      }
                      className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                      placeholder="Input type text"
                      type="text"
                    />
                  </div>
                </div>
              ))}
            </div>
            <h2 className="text-4xl mb-6 libre-baskerville-regular mb-2 text-center md:text-left">
              Persons
            </h2>
            {persons.map((person, index) => (
              <div key={person.id} className="mb-4">
                <div className="p-8 border border-black mt-2 shadow-lg bg-[#F6EFE6]">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    name="title"
                    type="text"
                    value={person.title}
                    onChange={(e) => handleChangePerson(index, e)}
                    className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    First Name
                  </label>
                  <input
                    name="first_name"
                    type="text"
                    value={person.first_name || ""}
                    onChange={(e) => handleChangePerson(index, e)}
                    className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Middle Name
                  </label>
                  <input
                    name="middle_name"
                    type="text"
                    value={person.middle_name || ""}
                    onChange={(e) => handleChangePerson(index, e)}
                    className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Last Name
                  </label>
                  <input
                    name="last_name"
                    type="text"
                    value={person.last_name || ""}
                    onChange={(e) => handleChangePerson(index, e)}
                    className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                  />

                  <label className="block text-sm font-medium text-gray-700 mt-4">
                    Details
                  </label>
                  <textarea
                    name="party_details"
                    value={person.party_details || ""}
                    onChange={(e) => handleChangePerson(index, e)}
                    className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                  ></textarea>

                  <button
                    type="button"
                    onClick={() => removePerson(person.id)}
                    className="mt-2 px-4 py-2 bg-black text-white "
                  >
                    Remove Person
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addPerson}
              className="bg-black text-md w-full sm:w-32 h-16 text-white px-4 py-1 mb-4"
            >
              Add Person
            </button>

            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className="bg-[#EAA444] w-5/6 sm:w-screen text-xl h-16 text-white mr-2"
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
