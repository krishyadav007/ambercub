// Read
// import mysql from "mysql2/promise";
// import { getAuth } from "@clerk/nextjs/server";
import { db } from '../../../../lib/db';
import { auth } from "@/auth"

export async function GET(req, { params }) {
  const session = await auth();
  const userId = session?.user?.id;
  try {

    const response_locations = await db.location.findMany({
      where: {
        added_by: userId
      }
    });
    
  //   const connection = await mysql.createConnection({
  //     host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
  //     user: process.env.NEXT_PUBLIC_USER, //DB_USER,
  //     password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
  //     database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
  //   });

  //   const AllLocationQuery =
  //     `SELECT * FROM location WHERE added_by = "` + userId + `"`;
  //   let response_locations = await connection.query(AllLocationQuery);

  //   await connection.end();

    return new Response(
      JSON.stringify({
        location: response_locations,
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

export async function POST(req, { params }) {
  // Handle POST requests if needed
  return new Response("Method Not Allowed", {
    status: 405,
    headers: {
      Allow: "GET",
    },
  });
}
