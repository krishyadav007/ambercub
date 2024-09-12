// import mysql from "mysql2/promise";
import { db } from '../../../../../lib/db';

export async function DELETE(req, { params }) {
  const { nid } = params;
  try {
    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });
    const locationResponses = await db.announcement.deleteMany({
      where: {
        nid: nid
      }
    });
    // const DeleteLocationQuery = `DELETE FROM announcement WHERE nid = ?`;
    // const [locationResponses] = await connection.query(DeleteLocationQuery, [
    //   nid,
    // ]);

    // await connection.end();

    return new Response(
      JSON.stringify({ message: "Announcement deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error deleting Announcement:", error);
    return new Response(
      JSON.stringify({ message: "Error deleting Announcement" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
