// import mysql from "mysql2/promise";

// const checkTableExistsQuery = `
//     SHOW TABLES LIKE 'location';
// `;

// const createTableQuery = `
//     CREATE TABLE location (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         aid VARCHAR(255) NOT NULL,
//         address LONGTEXT NOT NULL,
//         details LONGTEXT NOT NULL,
//         lat DECIMAL(10, 8) NOT NULL,
//         lon DECIMAL(11, 8) NOT NULL,
//         added_by VARCHAR(255) NOT NULL
//     );
// `;

// export async function POST(request) {
//     try {
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
// //
// //
// //
// // import mysql from "mysql2/promise";

// // export default async function handler(req, res) {
// //     if (req.method !== "POST") {
// //         return res
// //             .status(405)
// //             .json({ message: "Only POST requests are allowed" });
// //     }

// //     const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// //     const connection = await mysql.createConnection({
// //         host: DB_HOST,
// //         user: DB_USER,
// //         password: DB_PASSWORD,
// //         database: DB_NAME,
// //     });

// //     const query = `
// //         CREATE TABLE location (
// //             id INT AUTO_INCREMENT PRIMARY KEY,
// //             name VARCHAR(255) NOT NULL,
// //             address VARCHAR(255) NOT NULL,
// //             lat DECIMAL(10, 8) NOT NULL,
// //             lon DECIMAL(11, 8) NOT NULL
// //         );
// //     `;

// //     try {
// //         await connection.query(query);
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
