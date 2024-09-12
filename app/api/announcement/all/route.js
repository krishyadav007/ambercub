// import mysql from "mysql2/promise";
// import { currentUser } from "@clerk/nextjs/server";
import { db } from '../../../../lib/db';
import { auth } from "@/auth"

export async function POST(req, { params }) {
  const session = await auth();
  const userId = session?.user?.id;

  try {
    const body = await req.json();
    console.log(userId);
    const announcements = await db.announcement.findMany({
      where: {
        nid: {
          in: (
            await db.alert.findMany({
              where: {
                userid: userId
              },
              select: {
                nid: true
              }
            })
          ).map(alert => alert.nid)
        }
      }
    });

    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });

    // // You can use the body to customize your query if needed
    // const AllAnnouncementQuery =
    //   `SELECT * 
    //     FROM announcement 
    //     WHERE nid IN (
    //         SELECT nid 
    //         FROM alerts 
    //         WHERE userid = "` +
    //   user["id"] +
    //   `"
    //     );
    //     `;
    // // `SELECT * FROM alerts WHERE userid = "` + userId + `"`;
    // let response_Announcement = await connection.query(AllAnnouncementQuery);
    // await connection.end();
    console.log(announcements);
    return new Response(
      JSON.stringify({
        location: announcements,
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
