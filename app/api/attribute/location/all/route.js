// import mysql from "mysql2/promise";
import { db } from '../../../../../lib/db';

export async function POST(request) {
  try {
    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });

    // const AllAttributeQuery = `SELECT * FROM attribute WHERE type = "location"`;
    // const [attributes] = await connection.query(AllAttributeQuery);
    // await connection.end();

    const attributes = await db.attribute.findMany();

    return new Response(
      JSON.stringify({
        message: "Displaying all the attributes",
        attributes,
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
      JSON.stringify({ message: "Error getting all attributes" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
