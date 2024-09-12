import mysql from "mysql2/promise";

const checkTableExistsQuery = `
    SHOW TABLES LIKE 'attribute';
`;

const createTableQuery = `
    CREATE TABLE attribute (
        id INT AUTO_INCREMENT PRIMARY KEY,
        attribute VARCHAR(255) NOT NULL,
        type VARCHAR(255) NOT NULL
    );
`;

export async function POST(request) {
    try {
        const connection = await mysql.createConnection({
            host: "db4free.net", //DB_HOST,
            user: "rootstem", //DB_USER,
            password: "3711mouseprocess", // DB_PASSWORD,
            database: "ambercub", // DB_NAME
        });

        const [rows] = await connection.query(checkTableExistsQuery);
        if (rows.length > 0) {
            await connection.end();
            return new Response(
                JSON.stringify({ message: "Table already exists" }),
                {
                    status: 200,
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
        }

        await connection.query(createTableQuery);
        await connection.end();

        return new Response(
            JSON.stringify({ message: "Table created successfully" }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    } catch (error) {
        console.error("Error creating the table:", error);
        return new Response(
            JSON.stringify({ message: "Error creating table" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }
}
