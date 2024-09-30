import { db } from '../../../../../lib/db';
// import mysql from "mysql2/promise";

export async function PUT(request) {
  try {
    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });
    const result = await db.attribute.updateMany({
      where: {
        attribute: originalAttribute,
      },
      data: {
        attribute: attribute
      }
    });
    // const { attribute, originalAttribute } = await request.json();
    // const UpdateQuery = `UPDATE attribute SET attribute = ? WHERE attribute = ? AND type = 'announcement'`;
    // await connection.query(UpdateQuery, [attribute, originalAttribute]);
    // await connection.end();

    return new Response(
      JSON.stringify({ message: "Attribute updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error updating attribute:", error);
    return new Response(
      JSON.stringify({ message: "Error updating attribute" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
