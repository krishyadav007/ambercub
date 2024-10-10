// export async function POST(req, { params }) {
//     console.log("Just an api")
// }
//location
// import mysql from "mysql2/promise";
import { db } from '../../../../../lib/db';
export async function GET(request, { params }) {
  const { nid } = params;
  try {
    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });

    // Fetch announcement
    // const [announcementRows] = await connection.execute(
    //   "SELECT * FROM announcement WHERE nid = ?",
    //   [nid],
    // );
    // const lat = announcementRows[0]["lat"];
    // const lon = announcementRows[0]["lon"];
    // const dist = 3;

    // const ValidateLocationQuery =
    //   `SELECT * , SQRT( POW(69.1 * (lat - ` +
    //   lat +
    //   `), 2) + POW(69.1 * (` +
    //   lon +
    //   ` - lon) * COS(lat / 57.3), 2)) AS distance FROM location HAVING distance < ` +
    //   dist +
    //   ` ORDER BY distance;`;

    // let [locationResponses] = await connection.query(ValidateLocationQuery);
    // console.log(locationResponses);

    const announcementRows = await db.announcement.findMany({
      where: {
        nid: nid,
      },
    });
    console.log("announcement", announcementRows);
    
    const lat = announcementRows[0]?.lat;
    const lon = announcementRows[0]?.lon;
    const dist = 3;
    
    // Validate locations within a certain distance using raw SQL query
    const locationResponses = await db.$queryRaw`
      SELECT *, 
        SQRT(
          POW(69.1 * (lat - ${lat}), 2) + 
          POW(69.1 * (${lon} - lon) * COS(lat / 57.3), 2)
        ) AS distance 
      FROM Location 
      HAVING distance < ${dist} 
      ORDER BY distance;
    `;

    return new Response(
      JSON.stringify({ message: "Validating the form data", validatedData:  locationResponses}),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error validating the form data", error);
    return new Response(
      JSON.stringify({ message: "Error validating the form data" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
