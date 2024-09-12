export async function POST(req, { params }) {
    console.log("Just an api")
}
// //image text date
// // import mysql from "mysql2/promise";
// import { db } from '../../../../lib/db';

// export async function GET(request, { params }) {
//   const { nid } = params;
//   try {
//     // const connection = await mysql.createConnection({
//     //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
//     //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
//     //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
//     //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
//     // });

//     // Fetch announcement
//     // const [announcementRows] = await connection.execute(
//     //   "SELECT * FROM announcement WHERE nid = ?",
//     //   [nid],
//     // );
//     // await connection.end();
//     const announcement = await db.announcement.findFirst({
//       where: {
//         nid: nid,
//       },
//     });

//     return new Response(
//       JSON.stringify({ message: "Validates successfully" }),
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
//       JSON.stringify({ message: "Error creating location attribute" }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//   }
// }