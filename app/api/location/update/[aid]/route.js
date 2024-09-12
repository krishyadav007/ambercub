// import mysql from "mysql2/promise";
import { db } from '../../../../../lib/db';

export async function POST(request, { params }) {
  const { aid } = params;
  try {
    // const connection = await mysql.createConnection({
    //   host: process.env.NEXT_PUBLIC_HOST, //DB_HOST,
    //   user: process.env.NEXT_PUBLIC_USER, //DB_USER,
    //   password: process.env.NEXT_PUBLIC_PASSWORD, // DB_PASSWORD,
    //   database: process.env.NEXT_PUBLIC_DB_NAME, // DB_NAME
    // });

    const { location, persons, pairs } = await request.json();
    const json_s = JSON.stringify(pairs);
    // Update the location record
    let updateResponses = await db.location.updateMany({
      where: {
        aid: aid,
      },
      data: {
        address: location.address,
        lat: location.latitude,
        lon: location.longitude,
        details: json_s,
      },
    });

    // Fetch all persons associated with the given `aid`
    const personRows = await db.ainst.findMany({
      where: {
        aid: aid,
      },
    });

    let personSet = new Set(personRows.map(person => person.id));

    for (let ii = 0; ii < persons.length; ii++) {
      if (!personSet.has(persons[ii].id)) {
        console.log("INSERT ", persons[ii].id);

        // Insert a new person if not found in the set
        await db.ainst.create({
          data: {
            aid: aid,
            title: persons[ii].title,
            first_name: persons[ii].firstName,
            middle_name: persons[ii].middleName,
            last_name: persons[ii].lastName,
            party_details: persons[ii].details,
          },
        });
      } else {
        console.log("EXIST ", persons[ii].id);

        // Update an existing person if found in the set
        await db.ainst.update({
          where: {
            id: persons[ii].id,
          },
          data: {
            title: persons[ii].title,
            first_name: persons[ii].firstName,
            middle_name: persons[ii].middleName,
            last_name: persons[ii].lastName,
            party_details: persons[ii].details,
          },
        });

        // Remove the updated person's id from the set
        personSet.delete(persons[ii].id);
      }
    }

    // Delete any remaining persons that were not updated or newly added
    await Promise.all(
      Array.from(personSet).map(async (id) => {
        await db.ainst.delete({
          where: {
            id: id,
          },
        });
      })
    );

    // const UpdateLocationQuery =
    //   `UPDATE location
    //   SET address = '` +
    //   location.address +
    //   `',
    // lat = '` +
    //   location.latitude +
    //   `',
    // lon = '` +
    //   location.longitude +
    //   `',
    // details = '` +
    //   json_s +
    //   `'
    // WHERE aid= "` +
    //   aid +
    //   `";`;

    // let UpdateResponses = await connection.query(UpdateLocationQuery);

    // const [personRows] = await connection.execute(
    //   "SELECT * FROM ainst WHERE aid = ?",
    //   [aid],
    // );

    // let personSet = new Set();
    // for (let ii = 0; ii < personRows.length; ii++) {
    //   personSet.add(personRows[ii]["id"]);
    // }
    // for (let ii = 0; ii < persons.length; ii++) {
    //   if (!personSet.has(persons[ii]["id"])) {
    //     console.log("INSERT ", persons[ii]["id"]);
    //     const InsertPersonQuery =
    //       `INSERT INTO ainst (aid, title, first_name, middle_name, last_name, party_details) VALUES ('` +
    //       aid +
    //       `', '` +
    //       persons[ii]["title"] +
    //       `', '` +
    //       persons[ii]["firstName"] +
    //       `','` +
    //       persons[ii]["middleName"] +
    //       `','` +
    //       persons[ii]["lastName"] +
    //       `','` +
    //       persons[ii]["details"] +
    //       `')`;
    //     await connection.query(InsertPersonQuery);
    //   } else {
    //     console.log("EXIST ", persons[ii]["id"]);
    //     const SetPersonQuery =
    //       `UPDATE ainst SET
    //       title='` +
    //       persons[ii]["title"] +
    //       `',
    //       first_name='` +
    //       persons[ii]["firstName"] +
    //       `',
    //       middle_name='` +
    //       persons[ii]["middleName"] +
    //       `',
    //       last_name='` +
    //       persons[ii]["lastName"] +
    //       `',
    //       party_details='` +
    //       persons[ii]["details"] +
    //       `' WHERE id= "` +
    //       persons[ii]["id"] +
    //       `";`;
    //     await connection.query(SetPersonQuery);
    //     personSet.delete(persons[ii]["id"]);
    //   }
    // }
    // personSet.forEach(async function (value) {
    //   const DeleteLocationQuery = `DELETE FROM ainst WHERE id = ?`;
    //   const [deletedResponses] = await connection.query(DeleteLocationQuery, [
    //     value,
    //   ]);
    // });

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
