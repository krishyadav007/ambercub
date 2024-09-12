// import mysql from "mysql2/promise";
import { db } from '../../../../../lib/db';

export async function DELETE(req, { params }) {
  const { aid } = params;
  try {
    
    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });

    // const DeleteLocationQuery = `DELETE FROM location WHERE aid = ?`;
    // const [locationResponses] = await connection.query(DeleteLocationQuery, [
    //   aid,
    // ]);
    const locationResponses = await db.location.deleteMany({
      where: {
        aid: aid, // Replace with the variable that holds the 'aid' value to be deleted
      },
    });
    // await connection.end();

    return new Response(
      JSON.stringify({ message: "Location deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error deleting location:", error);
    return new Response(
      JSON.stringify({ message: "Error deleting location" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
