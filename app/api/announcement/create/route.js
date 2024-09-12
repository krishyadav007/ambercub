// import mysql from "mysql2/promise";
import { auth } from "@/auth"
import { v4 } from "uuid";
import { db } from '../../../../lib/db';
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

    const formData = await request.formData();
    console.log(formData);

    const nid = v4();

    const base64Image = formData.get("file");
    const medium = formData.get("medium");
    const published_on = formData.get("publishedDate");
    console.log(published_on);
    const { text } = JSON.parse(formData.get("announcement"));
    const location = formData.get("address");
    const lat = formData.get("latitude");
    const lon = formData.get("longitude");
    let details;
    try {
      const dropboxesData = formData.get("dropboxes");
      details =
        typeof dropboxesData === "string"
          ? dropboxesData
          : JSON.stringify(dropboxesData);
    } catch (error) {
      console.error("Error processing dropboxes:", error);
      details = "[]";
    }
    const persons = JSON.parse(formData.get("persons"));
    const added_by = userId;
    const last_validated = "12/12/2022";

    await db.announcement.create({
      data: {
        nid: nid,
        medium: medium,
        published_on: new Date(published_on), // Ensure this is a valid date
        img_path: base64Image,
        text: text,
        details: details,
        location: location,
        lat: lat,
        lon: lon,
        added_by: added_by,
        last_validated: new Date('2005-01-01'), // Static date as in the original query
      },
    });
    await Promise.all(persons.map(async (person) => {
      await db.ninst.create({
        data: {
          nid: nid,
          title: person.title || null,
          first_name: person.first_name || null,
          middle_name: person.middle_name || null,
          last_name: person.last_name || null,
          party_details: person.party_details || null,
        },
      });
    }));
    
    // const InsertAnnouncementQuery =
    //   `INSERT INTO announcement (nid, medium, published_on, img_path, text, details, location, lat, lon, added_by, last_validated) VALUES ('` +
    //   nid +
    //   `', '` +
    //   medium +
    //   `', '` +
    //   published_on +
    //   `', ' ` +
    //   base64Image +
    //   `','` +
    //   text +
    //   `','` +
    //   details +
    //   `','` +
    //   location +
    //   `','` +
    //   lat +
    //   `','` +
    //   lon +
    //   `','` +
    //   added_by +
    //   `', '2005-01-01' )`;

    // await connection.query(InsertAnnouncementQuery);

    // persons.forEach(async (person, ii) => {
    //   const InsertPersonQuery = `INSERT INTO ninst (nid, title, first_name, middle_name, last_name, party_details) VALUES (?, ?, ?, ?, ?, ?)`;

    //   const values = [
    //     nid,
    //     person.title || null,
    //     person.first_name || null,
    //     person.middle_name || null,
    //     person.last_name || null,
    //     person.party_details || null,
    //   ];

    //   await connection.query(InsertPersonQuery, values);
    // });
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
    console.error("Error processing form data:", error);
    return new Response(JSON.stringify({ message: "Error submitting form" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
