export async function POST(req, { params }) {
    console.log("Just an api")
}
// import mysql from "mysql2/promise";

// const checkTableExistsQuery = `
//     SHOW TABLES LIKE 'ainst';
// `;

// const createTableQuery = `
//     CREATE TABLE ainst (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         aid VARCHAR(255) NOT NULL,
//         title VARCHAR(255) NULL,
//         first_name VARCHAR(255) NOT NULL,
//         middle_name VARCHAR(255) NULL,
//         last_name VARCHAR(255) NULL,
//         party_details VARCHAR(255) NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//         updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
//     );
//     ;`

// export async function POST(request) {
//     try {
//         const reqi = await request;

//         const connection = await mysql.createConnection({
//             host: "db4free.net", //DB_HOST,
//             user: "rootstem", //DB_USER,
//             password: "3711mouseprocess", // DB_PASSWORD,
//             database: "ambercub", // DB_NAME
//         });

//         const [rows] = await connection.query(checkTableExistsQuery);
//         if (rows.length > 0) {
//             await connection.end();
//             return new Response(
//                 JSON.stringify({ message: "Table already exists" }),
//                 {
//                     status: 200,
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 },
//             );
//         }

//         await connection.query(createTableQuery);
//         await connection.end();

//         return new Response(
//             JSON.stringify({ message: "Table created successfully" }),
//             {
//                 status: 200,
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             },
//         );
//     } catch (error) {
//         console.error("Error creating the table:", error);
//         return new Response(
//             JSON.stringify({ message: "Error creating table" }),
//             {
//                 status: 500,
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//             },
//         );
//     }
// }

// // // pages/api/createNinstTable.js
// // import mysql from "mysql2/promise";

// // export default async function handler(req, res) {
// //     if (req.method !== "POST") {
// //         return res
// //             .status(405)
// //             .json({ message: "Only POST requests are allowed" });
// //     }

// //     // Replace these with your MySQL connection details
// //     const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// //     const connection = await mysql.createConnection({
// //         host: "db4free.net", //DB_HOST,
// //         user: "rootstem", //DB_USER,
// //         password: "3711mouseprocess", // DB_PASSWORD,
// //         database: "ambercub", // DB_NAME
// //     });

// //     const checkTableExistsQuery = `;
// //         SHOW TABLES LIKE 'ninst';
// //     `;

// //     const createTableQuery = `
// //         CREATE TABLE ninst (
// //             id INT AUTO_INCREMENT PRIMARY KEY,
// //             nid VARCHAR(255) NOT NULL,
// //             title VARCHAR(255) NULL,
// //             first_name VARCHAR(255) NOT NULL,
// //             middle_name VARCHAR(255) NULL,
// //             last_name VARCHAR(255) NULL,
// //             party_details VARCHAR(255) NULL,
// //             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
// //             updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
// //         );
// //     `;

// //     try {
// //         const [rows] = await connection.query(checkTableExistsQuery);
// //         if (rows.length > 0) {
// //             await connection.end();
// //             return res.status(200).json({ message: "Table already exists" });
// //         }

// //         await connection.query(createTableQuery);
// //         await connection.end();
// //         res.status(200).json({ message: "Table created successfully" });
// //     } catch (error) {
// //         console.error(error);
// //         res.status(500).json({
// //             message: "Error creating table",
// //             error: error.message,
// //         });
// //     }
// // }
