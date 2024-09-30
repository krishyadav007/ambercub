// import mysql from "mysql2/promise";
import { db } from '../../../../../lib/db';
import { auth } from "@/auth"

export async function POST(req, { params }) {
  const session = await auth();
  const EmailId = session?.user?.email;
  try {
    // Parse the request body
    const body = await req.json();

    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });
    const allAnnouncements = await db.announcement.findMany();
    // // You can use the body to customize your query if needed
    // const AllLocationQuery = `SELECT * FROM announcement `;
    // let response_locations = await connection.query(AllLocationQuery);
    // await connection.end();

    return new Response(
      JSON.stringify({
        location: allAnnouncements,
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
  // Handle GET requests if needed
  return new Response("Method Not Allowed", {
    status: 405,
    headers: {
      Allow: "POST",
    },
  });
}
