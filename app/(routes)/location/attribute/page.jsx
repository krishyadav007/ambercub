"use client";
import React, { useState, useEffect } from "react";

const AttributeManager = () => {
  const [attribute, setAttribute] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");

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

  const handleAddAttribute = async (event) => {
    event.preventDefault();
    if (attribute.trim() !== "") {
      try {
        const response = await fetch("/api/attribute/location/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ attribute }),
        });
        const data = await response.json();
        if (response.ok) {
          setAttributes([...attributes, { id: data.id, attribute }]);
          setAttribute("");
        } else {
          console.error("Error adding attribute:", data.message);
        }
      } catch (error) {
        console.error("Error adding attribute:", error);
      }
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditValue(attributes[index].attribute);
  };

  const handleSaveEdit = async (index) => {
    try {
      const response = await fetch("/api/attribute/location/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attribute: editValue, // Data to be updated
          originalAttribute: attributes[index].attribute, // Original data to find and update
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const updatedAttributes = [...attributes];
        updatedAttributes[index].attribute = editValue;
        setAttributes(updatedAttributes);
        setEditingIndex(-1);
      } else {
        console.error("Error updating attribute:", data.message);
      }
    } catch (error) {
      console.error("Error updating attribute:", error);
    }
  };

  const handleDelete = async (index) => {
    try {
      const response = await fetch("/api/attribute/location/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          attribute: attributes[index].attribute, // Data to be deleted
        }),
      });

      const data = await response.json();
      if (response.ok) {
        const updatedAttributes = attributes.filter((_, i) => i !== index);
        setAttributes(updatedAttributes);
      } else {
        console.error("Error deleting attribute:", data.message);
      }
    } catch (error) {
      console.error("Error deleting attribute:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bg-cream-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl w-full space-y-8">
          <div className="mt-4 w-full">
            <h1 className="text-4xl mb-6">Attributes</h1>
          </div>
          <form onSubmit={handleAddAttribute} className="mb-4 space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Add Attribute
            </label>
            <input
              name="attribute"
              type="text"
              value={attribute}
              onChange={(e) => setAttribute(e.target.value)}
              className="w-full px-4 py-2 border-b border-gray-300 focus:border-gray-400 focus:ring-0 outline-none"
              required
            />
            <button
              type="submit"
              className="bg-[#EAA444] w-full text-xl h-12 text-white"
            >
              Add Attribute
            </button>
          </form>

          {attributes.length > 0 && (
            <div className="w-full mt-4 overflow-x-auto">
              <h2 className="text-2xl mb-4">Existing Attributes</h2>
              <table className="min-w-full bg-white divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-900">
                      Attribute Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left text-sm font-medium text-gray-900 w-1/4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {attributes.map((attr, index) => (
                    <tr key={attr.id} className="even:bg-gray-50">
                      <td className="py-2 px-4 border-b border-gray-300 text-sm">
                        {editingIndex === index ? (
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300"
                            autoFocus
                          />
                        ) : (
                          attr.attribute
                        )}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300 text-sm">
                        <div className="flex justify-end space-x-2">
                          {editingIndex === index ? (
                            <button
                              onClick={() => handleSaveEdit(index)}
                              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              onClick={() => handleEdit(index)}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AttributeManager;
