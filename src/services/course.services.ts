import format from "pg-format";
import { client } from "../database";
import {
  Course,
  CourseCreate,
  CourseResult,
} from "../interfaces/course.interfaces";

const create = async (payload: CourseCreate): Promise<Array<Course>> => {
  const columns: Array<string> = Object.keys(payload[0]);
  const values: any[][] = payload.map((element) => Object.values(element));

  const queryFormat: string = format(
    'INSERT INTO "courses" (%I) VALUES %L RETURNING *;',
    columns,
    values
  );

  const query: CourseResult = await client.query(queryFormat);
  return query.rows;
};

const read = async (): Promise<Array<Course>> => {
  const query: CourseResult = await client.query('SELECT * FROM "courses";');
  return query.rows;
};

export default { create, read };
