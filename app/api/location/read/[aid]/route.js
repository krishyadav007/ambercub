// Read
// import mysql from "mysql2/promise";
import { db } from '../../../../../lib/db';
import { auth } from "@/auth"
// import { getAuth } from "@clerk/nextjs/server";

export async function POST(req, { params }) {
  const { aid } = params;
  const session = await auth();
  const userId = session?.user?.id;
  // const { userId } = getAuth(req);
  try {
    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });

    // const GetLocationQuery =
    //   `SELECT * FROM location WHERE aid = "` +
    //   aid +
    //   `" AND added_by = "` +
    //   userId +
    //   `"`;
    // let response_locations = await connection.query(GetLocationQuery);

    // const GetAinstQuery = `SELECT * FROM ainst WHERE aid = "` + aid + `";`;
    // let response_ainsts = await connection.query(GetAinstQuery);

    // await connection.end();
    // Fetch locations

    const response_locations = await db.location.findMany({
      where: {
        aid: aid, // Filter by 'aid'
        added_by: userId, // Filter by 'added_by'
      },
    });

    // Fetch ainst records
    const response_ainsts = await db.ainst.findMany({
      where: {
        aid: aid, // Filter by 'aid'
      },
    });


    return new Response(
      JSON.stringify({
        location: response_locations,
        persons: response_ainsts,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error processing form data:", error);
    return new Response(
      JSON.stringify({ message: "Error getting the values" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}

export async function GET(req, { params }) {
  // Handle POST requests if needed
  return new Response("Method Not Allowed", {
    status: 405,
    headers: {
      Allow: "POST",
    },
  });
}
