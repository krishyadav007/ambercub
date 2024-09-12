export async function POST(req, { params }) {
    console.log("Just an api")
}
// import mysql from "mysql2/promise";

// export async function POST(req) {
//   try {
//     const connection = await mysql.createConnection({
//       host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
//       user: process.env.NEXT_PUBLIC_USER, //DB_USER,
//       password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
//       database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
//     });

//     const DeleteTableQuery = `DROP TABLE ninst;`;

//     await connection.query(DeleteTableQuery);
//     await connection.end();

//     return new Response(
//       JSON.stringify({ message: "Ninst table deleted successfully" }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//   } catch (error) {
//     console.error("Error processing form data:", error);
//     return new Response(
//       JSON.stringify({ message: "Error deleting location" }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//   }
// }
