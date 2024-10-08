"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Swal from "sweetalert2"; // Optional: If you plan to use Swal for notifications

export default function CreateTablesPage() {
    // 1. Define all Hooks at the top, unconditionally
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL
        ? process.env.NEXT_PUBLIC_ADMIN_EMAIL.split(";")
        : [];
    const { data: session, status } = useSession();
    const EmailId = session?.user?.email;

    const [isAdmin, setIsAdmin] = useState(false);
    const [tables, setTables] = useState([
        { name: "Announcement", exists: false },
        { name: "Location", exists: false },
        { name: "Ninst", exists: false },
        { name: "Ainst", exists: false },
        { name: "Attribute", exists: false },
        { name: "Alerts", exists: false },
    ]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Optional: To handle loading states

    // 2. Effect to determine if the user is an admin
    useEffect(() => {
        if (status === "loading") {
            // Session is still loading
            return;
        }

        if (EmailId) {
            setIsAdmin(ADMIN_EMAIL.includes(EmailId));
        } else {
            setIsAdmin(false);
        }
    }, [EmailId, ADMIN_EMAIL, status]);

    // 3. Optional: Fetch existing table statuses if needed
    // You can add another useEffect here if you need to fetch initial table states

    // 4. Handle loading state
    if (status === "loading" || loading) {
        return (
            <div className="container mx-auto p-4">
                Loading session...
            </div>
        );
    }

    // 5. Conditional rendering after all Hooks
    if (!isAdmin) {
        return (
            <div className="container mx-auto p-4">
                Access denied. Admin privileges required.
            </div>
        );
    }

    // 6. Define functions for creating and deleting tables
    const createTable = async (tableName) => {
        try {
            const response = await fetch(
                `/api/tables/create${tableName}Table`,
                {
                    method: "POST",
                },
            );
            if (response.ok) {
                setTables((prevTables) =>
                    prevTables.map((table) =>
                        table.name === tableName
                            ? { ...table, exists: true }
                            : table,
                    ),
                );
                console.log(`${tableName} table created successfully`);
                Swal.fire({
                    title: "Success",
                    text: `${tableName} table created successfully.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                throw new Error(`Failed to create ${tableName} table.`);
            }
        } catch (error) {
            console.error(`Error creating ${tableName} table:`, error);
            Swal.fire({
                title: "Error",
                text: `Failed to create ${tableName} table.`,
                icon: "error",
            });
        }
    };

    const deleteTable = async (tableName) => {
        try {
            const response = await fetch(
                `/api/tables/delete${tableName}Table`,
                {
                    method: "POST",
                },
            );
            if (response.ok) {
                setTables((prevTables) =>
                    prevTables.map((table) =>
                        table.name === tableName
                            ? { ...table, exists: false }
                            : table,
                    ),
                );
                console.log(`${tableName} table deleted successfully`);
                Swal.fire({
                    title: "Success",
                    text: `${tableName} table deleted successfully.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else {
                throw new Error(`Failed to delete ${tableName} table.`);
            }
        } catch (error) {
            console.error(`Error deleting ${tableName} table:`, error);
            Swal.fire({
                title: "Error",
                text: `Failed to delete ${tableName} table.`,
                icon: "error",
            });
        }
    };

    // 7. Render the component
    return (
        <>
            <div className="container mx-auto p-4">
                <div className="flex justify-center mt-8 space-x-4">
                    <Link
                        href="/location/attribute"
                        className="flex items-center justify-center text-sm font-medium bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 transition duration-300"
                    >
                        Attributes
                    </Link>
                    {/* Uncomment and use if needed
                    <Link
                        href="/announcement/attribute"
                        className="flex items-center justify-center text-sm font-medium bg-blue-500 text-white px-6 py-3 hover:bg-blue-600 transition duration-300"
                    >
                        Announcement Attribute
                    </Link>
                    */}
                </div>
                <h1 className="text-2xl font-bold mb-4">Manage Tables</h1>
                {error && (
                    <div className="mb-4 text-red-500">
                        Error: {error}
                    </div>
                )}
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Table Name</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tables.map((table) => (
                            <tr key={table.name}>
                                <td className="py-2 px-4 border-b">
                                    {table.name}
                                </td>
                                <td className="py-2 flex justify-end px-4 border-b">
                                    {!table.exists ? (
                                        <button
                                            onClick={() => createTable(table.name)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                        >
                                            Create
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => deleteTable(table.name)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}
