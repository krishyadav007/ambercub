// Read
import { db } from '../../../../../lib/db';
import { auth } from "@/auth"

export async function POST(req, { params }) {
  const session = await auth();
  const EmailId = session?.user?.email;
  const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL.split(";");
  if (!ADMIN_EMAIL.includes(EmailId)) {
    return new Response(
      JSON.stringify({
        "Permission":"Denied"
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
  try {
    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });
    const allLocations = await db.location.findMany();

    // const AllLocationQuery = `SELECT * FROM location`;
    // let response_locations = await connection.query(AllLocationQuery);

    // await connection.end();

    return new Response(
      JSON.stringify({
        location: allLocations,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error retrieving data:", error);
    return new Response(
      JSON.stringify({ message: "Error retrieving the values" }),
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
