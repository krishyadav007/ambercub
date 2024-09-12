// import mysql from "mysql2/promise";
import { db } from '../../../../../lib/db';

export async function DELETE(request) {
  try {
    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });

    const { attribute } = await request.json();
    // const DeleteQuery = `DELETE FROM attribute WHERE attribute = ? AND type = 'announcement'`;
      const result = await db.attribute.deleteMany({
        where: {
          attribute: attribute,  // Replace with the variable or value you want to match
          type: "announcement"
        }
      });    
    // await connection.query(DeleteQuery, [attribute]);
    // await connection.end();

    return new Response(
      JSON.stringify({ message: "Attribute deleted successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    console.error("Error deleting attribute:", error);
    return new Response(
      JSON.stringify({ message: "Error deleting attribute" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
