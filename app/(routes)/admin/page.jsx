"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function CreateTablesPage() {
    const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL.split(";");
    const { data: session, status } = useSession();
    const EmailId = session?.user?.email;    
    const [isAdmin, setIsAdmin] = useState(false);
    // useEffect(() => {
    //     if (EmailId) {
    //       setIsAdmin(ADMIN_EMAIL.includes(EmailId));
    //     }
    // }, []);
    
    if (!isAdmin) {
        return (
            <div className="container mx-auto p-4">
                Access denied. Admin privileges required.
            </div>
        );
    }

    const [tables, setTables] = useState([
        { name: "Announcement", exists: false },
        { name: "Location", exists: false },
        { name: "Ninst", exists: false },
        { name: "Ainst", exists: false },
        { name: "Attribute", exists: false },
        { name: "Alerts", exists: false },
    ]);

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
            }
        } catch (error) {
            console.error(`Error creating ${tableName} table:`, error);
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
            }
        } catch (error) {
            console.error(`Error deleting ${tableName} table:`, error);
        }
    };

    return (
        <>
            <div className="container mx-auto p-4">
            <div className="flex justify-center mt-8 space-x-4">
                <Link
                    href="/location/attribute"
                    className="flex items-center justify-center text-sm font-medium bg-blue-500 text-white px-6 py-3  hover:bg-blue-600 transition duration-300"
                >
                    Attributes
                </Link>
                {/* <Link
                    href="/announcement/attribute"
                    className="flex items-center justify-center text-sm font-medium bg-blue-500 text-white px-6 py-3  hover:bg-blue-600 transition duration-300"
                >
                    Announcement Attribute
                </Link> */}
            </div>
                <h1 className="text-2xl font-bold mb-4">Manage Tables</h1>
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
                                    <button
                                        onClick={() => createTable(table.name)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Create
                                    </button>
                                    <button
                                        onClick={() => deleteTable(table.name)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}