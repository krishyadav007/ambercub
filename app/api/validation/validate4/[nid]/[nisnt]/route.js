// // medium
// import mysql from "mysql2/promise";

// export async function GET(request, { params }) {
//   const { nid, ninst } = params;
//   try {
//     const connection = await mysql.createConnection({
//       host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
//       user: process.env.NEXT_PUBLIC_USER, //DB_USER,
//       password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
//       database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
//     });
//     // Fetch announcement
//     const [announcementRows] = await connection.execute(
//       "SELECT * FROM ninst WHERE id = ?",
//       [nid],
//     );
//     const medium = announcementRows[0]["medium"];

//     const ValidateMediumQuery =
//       `SELECT DISTINCT medium
//       FROM announcement
//       WHERE SOUNDEX(medium) = SOUNDEX('` +
//       medium +
//       `');`;

//     let [MediumResponses] = await connection.query(ValidateMediumQuery);
//     console.log(MediumResponses);

//     await connection.end();

//     return new Response(
//       JSON.stringify({
//         message: "Validating the form data",
//         medium: MediumResponses,
//       }),
//       {
//         status: 200,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//   } catch (error) {
//     console.error("Error validating the form data", error);
//     return new Response(
//       JSON.stringify({ message: "Error validating the form data" }),
//       {
//         status: 500,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       },
//     );
//   }
// }
