"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

const AllPersons = () => {
  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      Swal.fire({
        title: "Loading...",
        text: "Fetching locations",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      try {
        const response = await fetch("/api/admin/location/all");
        const data = await response.json();
        setPersons(data.location);
        Swal.close();
      } catch (error) {
        console.error("Error fetching locations:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to fetch locations",
          icon: "error",
        });
      }
    };

    fetchLocations();
  }, []);

  const handleStatusClick = async (status, aid) => {
    Swal.fire({
      title: "Loading...",
      text: `Fetching details for ${status}`,
      icon: "info",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const response = await fetch(`/api/admin/location/status/${aid}/${status}`);
      const data = await response.json();
      Swal.fire({
        title: "Success",
        text: `Status updated successfully`,
        icon: "success",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
      Swal.fire({
        title: "Error",
        text: `Failed to fetch data for ${status}`,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-cream-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-8">
          <div className="mt-4">
            <Link
              href={`/location/create`}
              className="block text-lg font-medium bg-cream-3 text-black px-4 py-2 hover:bg-[#f3efe9] text-center w-full sm:w-auto"
            >
              Add location
            </Link>
          </div>
          {persons.map((person) => (
            <div
              key={person.id}
              className="p-4 sm:p-8 border border-black shadow-lg bg-[#F6EFE6]"
            >
              <div className="flex justify-between">
                <h1 className="text-3xl sm:text-4xl libre-baskerville-regular mb-2 text-center sm:text-left">
                  Location
                </h1>
                  <button
                  className={`px-4 py-2 text-right capitalize ${
                    person.Status === "active" ? "bg-cream-3" : "bg-black text-white"
                  }`}
                  onClick={() => handleStatusClick(person.Status, person.aid)}
                >
                  {person.Status}
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={person.address}
                  readOnly
                  className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Latitude
                  </label>
                  <input
                    type="text"
                    value={person.lat}
                    readOnly
                    className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Longitude
                  </label>
                  <input
                    type="text"
                    value={person.lon}
                    readOnly
                    className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
                  />
                </div>
              </div>
              <div className="mt-4">
                <Link
                  href={`/location/view/${person.aid}`}
                  className="block text-sm font-medium bg-black text-white px-4 py-2 text-center w-full sm:w-auto"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllPersons;

// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Swal from "sweetalert2";

// const AllPersons = () => {
//   const [persons, setPersons] = useState([]);
//   // const [isLoading, setIsLoading] = useState(true);
//   // const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLocations = async () => {
//       // Show loading alert
//       Swal.fire({
//         title: "Loading...",
//         text: "Fetching locations",
//         icon: "info",
//         allowOutsideClick: false,
//         showConfirmButton: false,
//         willOpen: () => {
//           Swal.showLoading();
//         },
//       });

//       try {
//         const response = await fetch("/api/admin/location/all");
//         const data = await response.json();
//         console.log(data);
//         setPersons(data.location);

//         // Close loading alert
//         Swal.close();
//       } catch (error) {
//         console.error("Error fetching locations:", error);

//         // Show error alert
//         Swal.fire({
//           title: "Error",
//           text: "Failed to fetch locations",
//           icon: "error",
//         });
//       }
//     };

//     fetchLocations();
//   }, []);

//   return (
//     <>
//       <div className="flex flex-col items-center bg-cream-1 py-8 px-4 sm:px-6 lg:px-8">
//         <div className="w-full max-w-4xl space-y-8">
//           <div className="mt-4">
//             <Link
//               href={`/location/create`}
//               className="block text-lg font-medium bg-cream-3 text-black px-4 py-2 hover:bg-[#f3efe9] text-center w-full sm:w-auto"
//             >
//               Add location
//             </Link>
//           </div>
//           {persons.map((person) => (
//             <div
//               key={person.id}
//               className="p-4 sm:p-8 border border-black shadow-lg bg-[#F6EFE6]"
//             >
// <div class="flex justify-between">
//   <h1 class="text-3xl sm:text-4xl libre-baskerville-regular mb-2 text-center sm:text-left">Location</h1>
//   <button class="bg-cream-3 px-4 py-2 text-right capitalize">{person.Status}</button>
// </div>
//               <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   value={person.address}
//                   readOnly
//                   className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none "
//                 />
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Latitude
//                   </label>
//                   <input
//                     type="text"
//                     value={person.lat}
//                     readOnly
//                     className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700">
//                     Longitude
//                   </label>
//                   <input
//                     type="text"
//                     value={person.lon}
//                     readOnly
//                     className="w-full px-4 py-2 mt-1 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none "
//                   />
//                 </div>
//               </div>
//               {/* <div className="mb-4">
//                 <label className="block text-sm font-medium text-gray-700 my-2">
//                   Attributes
//                 </label>
//                 {person.dropboxes.map((dropbox) => (
//                   <div
//                     key={dropbox.id}
//                     className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4"
//                   >
//                     <select
//                       value={dropbox.dropdown}
//                       readOnly
//                       disabled
//                       className="w-full px-4 py-2 border border-gray-300 bg-white "
//                     >
//                       <option value="">Dropdown</option>
//                       <option value="Option 1">Option 1</option>
//                       <option value="Option 2">Option 2</option>
//                     </select>
//                     <input
//                       type="text"
//                       value={dropbox.input}
//                       readOnly
//                       disabled
//                       className="w-full px-4 py-2 border bg-white  border-gray-300"
//                     />
//                   </div>
//                 ))}
//               </div> */}
//               <div className="mt-4">
//                 <Link
//                   href={`/location/view/${person.aid}`}
//                   className="block text-sm font-medium bg-black text-white px-4 py-2 text-center w-full sm:w-auto"
//                 >
//                   View
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllPersons;
