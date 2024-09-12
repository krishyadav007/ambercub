// import mysql from "mysql2/promise";
import { db } from '../../../../../lib/db';
import { auth } from "@/auth"
// import { currentUser } from "@clerk/nextjs/server";

export async function GET(request) {
  try {
    // const user = await currentUser();
    const session = await auth();
    const userId = session?.user?.id;
    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });
    const alerts = await db.alert.findMany({
      where: {
        userid: userId
      }
    });
    // const [alerts] = await connection.execute(
    //   `SELECT * FROM alerts WHERE userid = "` + user["id"] + `"`,
    // );
    // console.log(alerts);
    // await connection.end();
    return new Response(
      JSON.stringify({ message: "Attribute added successfully" }),
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
      JSON.stringify({ message: "Error creating location attribute" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
