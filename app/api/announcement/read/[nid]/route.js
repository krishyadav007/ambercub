// import mysql from "mysql2/promise";
import { db } from '../../../../../lib/db';
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  const nid = params.nid;
  try {
    // Parse the request body
    const body = await request.json();

    // You can use data from the body if needed
    // const someData = body.someField;

    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });

    // // Fetch announcement
    // const [announcementRows] = await connection.execute(
    //   "SELECT * FROM announcement WHERE nid = ?",
    //   [nid],
    // );

    // // Fetch associated persons
    // const [personRows] = await connection.execute(
    //   "SELECT * FROM ninst WHERE nid = ?",
    //   [nid],
    // );
    // await connection.end();

    // Fetch announcement
    const announcementRows = await db.announcement.findMany({
      where: {
        nid: nid
      }
    });

    // Fetch associated persons
    const personRows = await db.ninst.findMany({
      where: {
        nid: nid
      }
    });

    if (announcementRows.length === 0) {
      return NextResponse.json(
        { message: "Announcement not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      announcement: announcementRows[0],
      persons: personRows,
    });
    
  } catch (error) {
    console.error("Error fetching announcement:", error);
    return NextResponse.json(
      { message: "Error fetching announcement" },
      { status: 500 },
    );
  }
}

// Keep the GET method to return a "Method Not Allowed" response
export async function GET() {
  return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
}
