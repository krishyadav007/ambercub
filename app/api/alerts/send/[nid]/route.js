//location
// import mysql from "mysql2/promise";
export async function GET(request, { params }) {
  const { nid } = params;
  try {
    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });
    const announcement = await db.announcement.findUnique({
      where: {
        nid: nid,
      },
    });
    
    const lat = announcement.lat;
    const lon = announcement.lon;
    const dist = 3; // Distance in miles or kilometers
    const locationResponses = await db.$queryRaw`
    SELECT *,
      SQRT(POW(69.1 * (lat - ${lat}), 2) + POW(69.1 * (${lon} - lon) * COS(lat / 57.3), 2)) AS distance
    FROM location
    HAVING distance < ${dist}
    ORDER BY distance;
  `;
  let persons = {};

for (const location of locationResponses) {
  const ainstRecords = await db.ainst.findMany({
    where: {
      aid: location.aid,
    },
  });

  persons[location.aid] = ainstRecords;
}
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
    // // console.log(locationResponses);

    // let persons = {};
    // for (let ii = 0; ii < locationResponses.length; ii++) {
    //   // console.log("location: ", locationResponses[ii]["aid"]);

    //   const GetAinstQuery =
    //     `SELECT * FROM ainst WHERE aid = "` +
    //     locationResponses[ii]["aid"] +
    //     `";`;

    //   [persons[locationResponses[ii]["aid"]]] =
    //     await connection.query(GetAinstQuery);

    //   console.log(persons);
    // }
    // await connection.end();

    return new Response(
      JSON.stringify({
        announcements: announcementRows,
        locations: locationResponses,
        persons: persons,
      }),
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
