// import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
// import { currentUser } from "@clerk/nextjs/server";
import { db } from '../../../../../lib/db';
import { auth } from "@/auth"

export async function GET(request, { params }) {
  const nid = params.nid;
  const aid = params.aid;

  try {
    const session = await auth();
    const userId = session?.user?.id;
    // const user = await currentUser();
    // const connection = await mysql.createConnection({
    //   host: "db4free.net",
    //   user: "rootstem",
    //   password: "3711mouseprocess",
    //   database: "ambercub",
    // });
    await db.alert.create({
      data: {
        nid: nid,
        aid: aid,
        userid: userId
      }
    });
    // const InsertAlertsQuery =
    //   `INSERT INTO alerts (nid, aid, userid) VALUES ('` +
    //   nid +
    //   `', '` +
    //   aid +
    //   `', '` +
    //   user["id"] +
    //   `')`;
    // await connection.query(InsertAlertsQuery);

    // await connection.end();
    return new Response(
      JSON.stringify({ message: "Form submitted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (error) {
    console.error("Error fetching notice:", error);
    return NextResponse.json(
      { message: "Error fetching notice" },
      { status: 500 },
    );
  }
}
