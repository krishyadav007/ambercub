// app/api/create/route.js
// import mysql from "mysql2/promise";
// import { currentUser } from "@clerk/nextjs/server";
import { db } from '../../../../lib/db';
import { auth } from "@/auth"
import { v4 } from "uuid";

export async function POST(request) {
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
    const { location, persons, pairs } = await request.json();
    const aid = v4();
    const added_by = userId;
    const json_s = JSON.stringify(pairs);

    // const InsertLocationQuery =
    //   `INSERT INTO location (aid, address, lat, lon, details, added_by) VALUES ('` +
    //   aid +
    //   `', '` +
    //   location["address"] +
    //   `', '` +
    //   location["latitude"] +
    //   `','` +
    //   location["longitude"] +
    //   `','` +
    //   json_s +
    //   `','` +
    //   added_by +
    //   `');`;

    // await connection.query(InsertLocationQuery);

    // persons.forEach(async (person, ii) => {
    //   const InsertPersonQuery =
    //     `INSERT INTO ainst (aid, title, first_name, middle_name, last_name, party_details) VALUES ('` +
    //     aid +
    //     `', '` +
    //     person.title +
    //     `', '` +
    //     person.firstName +
    //     `','` +
    //     person.middleName +
    //     `','` +
    //     person.lastName +
    //     `','` +
    //     person.details +
    //     `')`;
    //   // console.log(person, ii);
    //   await connection.query(InsertPersonQuery);
    // });
    // await connection.end();
    // Insert location

    const locationResult = await db.location.create({
      data: {
        aid: aid,
        address: location.address,
        lat: parseFloat(location.latitude), // Assuming lat and lon should be floats
        lon: parseFloat(location.longitude),
        details: json_s, // Assuming json_s is already a stringified JSON or plain string
        added_by: added_by
      }
    });

    // Insert persons
    await Promise.all(
      persons.map((person) =>
        db.ainst.create({
          data: {
            aid: aid,
            title: person.title,
            first_name: person.firstName,
            middle_name: person.middleName || null, // Handling nullable fields
            last_name: person.lastName || null,
            party_details: person.details || null
          }
        })
      )
    );

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
    console.error("Error processing form data:", error);
    return new Response(JSON.stringify({ message: "Error submitting form" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
