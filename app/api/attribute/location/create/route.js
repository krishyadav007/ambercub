// import mysql from "mysql2/promise";
import { db } from '../../../../../lib/db';

export async function POST(request) {
  try {
    const { attribute } = await request.json();

    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });

    const result = await db.attribute.create({
      data: {
        attribute: attribute,
        type: "location"
      }
    });

    // const InsertAttributeQuery = `INSERT INTO attribute (attribute, type) VALUES (?, ?)`;
    // const [result] = await connection.query(InsertAttributeQuery, [
    //   attribute,
    //   "location",
    // ]);
    // await connection.end();

    return new Response(
      JSON.stringify({
        message: "Attribute added successfully",
        id: result.insertId,
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
