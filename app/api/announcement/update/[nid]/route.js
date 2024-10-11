// import mysql from "mysql2/promise";
import { auth } from "@/auth"
import { db } from '../../../../../lib/db';

export async function PUT(request, { params }) {
  const nid = params.nid;

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

    const base64Image = formData.get("file");
    const medium = formData.get("medium");
    const published_on = new Date(formData.get("publishedDate"));
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
    const last_validated = formData.get("publishedDate");

    let img_sql = "";
    if (base64Image) {
      console.log("notice image",base64Image);
      img_sql = `img_path='` + base64Image + `',`;
    }
    await db.announcement.update({
      where: { nid: nid },
      data: {
        medium: medium,
        published_on: published_on,
        img_path: img_sql, // assuming `img_sql` is a direct path or binary
        text: text,
        details: details,
        location: location,
        lat: lat,
        lon: lon,
        added_by: added_by,
        last_validated: new Date(published_on),
      },
    });
    const personRows = await db.ninst.findMany({
      where: { nid: nid },
    });
    
    let personSet = new Set(personRows.map(person => person.id));
    for (const person of persons) {
      if (!personSet.has(person.id)) {
        console.log("INSERT ", person);
    
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
      } else {
        console.log("EXIST ", person.id);
    
        await db.ninst.update({
          where: { id: person.id },
          data: {
            title: person.title || null,
            first_name: person.first_name || null,
            middle_name: person.middle_name || null,
            last_name: person.last_name || null,
            party_details: person.party_details || null,
          },
        });
        personSet.delete(person.id);
      }
    }
    for (const id of personSet) {
      await db.ninst.delete({
        where: { id: id },
      });
    }
    // const UpdateAnnouncementQuery =
    //   `UPDATE announcement
    //   SET medium='` +
    //   medium +
    //   `',
    //   published_on='` +
    //   published_on +
    //   `',` +
    //   img_sql +
    //   `text='` +
    //   text +
    //   `',
    //   details='` +
    //   details +
    //   `',
    //   location='` +
    //   location +
    //   `',
    //   lat='` +
    //   lat +
    //   `',
    //   lon='` +
    //   lon +
    //   `',
    //   added_by='` +
    //   added_by +
    //   `',
    //   last_validated='` +
    //   last_validated +
    //   `' WHERE nid = "` +
    //   nid +
    //   `"`;

    // await connection.query(UpdateAnnouncementQuery);

    // const [personRows] = await connection.execute(
    //   "SELECT * FROM ninst WHERE nid = ?",
    //   [nid],
    // );

    // let personSet = new Set();
    // for (let ii = 0; ii < personRows.length; ii++) {
    //   personSet.add(personRows[ii]["id"]);
    // }

    // for (let ii = 0; ii < persons.length; ii++) {
    //   if (!personSet.has(persons[ii]["id"])) {
    //     console.log("INSERT ", persons[ii]);

    //     const InsertPersonQuery =
    //       `INSERT INTO ninst (nid, title, first_name, middle_name, last_name, party_details) VALUES ('` +
    //       nid +
    //       `', '` +
    //       persons[ii]["title"] +
    //       `', '` +
    //       persons[ii]["first_name"] +
    //       `','` +
    //       persons[ii]["middle_name"] +
    //       `','` +
    //       persons[ii]["last_name"] +
    //       `','` +
    //       persons[ii]["party_details"] +
    //       `')`;
    //     await connection.query(InsertPersonQuery);
    //   } else {
    //     console.log("EXIST ", persons[ii]["id"]);
    //     const SetPersonQuery =
    //       `UPDATE ninst SET
    //       title='` +
    //       persons[ii]["title"] +
    //       `',
    //       first_name='` +
    //       persons[ii]["first_name"] +
    //       `',
    //       middle_name='` +
    //       persons[ii]["middle_name"] +
    //       `',
    //       last_name='` +
    //       persons[ii]["last_name"] +
    //       `',
    //       party_details='` +
    //       persons[ii]["party_details"] +
    //       `' WHERE id= "` +
    //       persons[ii]["id"] +
    //       `";`;
    //     await connection.query(SetPersonQuery);
    //     personSet.delete(persons[ii]["id"]);
    //   }
    // }
    // personSet.forEach(async function (value) {
    //   const DeleteLocationQuery = `DELETE FROM ninst WHERE id = ?`;
    //   const [deletedResponses] = await connection.query(DeleteLocationQuery, [
    //     value,
    //   ]);
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
