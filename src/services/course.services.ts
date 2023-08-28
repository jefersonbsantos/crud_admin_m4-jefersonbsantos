import format from "pg-format";
import { client } from "../database";
import {
  Course,
  CourseCreate,
  CourseResult,
} from "../interfaces/course.interfaces";

const create = async (payload: CourseCreate): Promise<Course> => {
  const queryFormat: string = format(
    'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: CourseResult = await client.query(queryFormat);
  return query.rows[0];
};

const read = async (): Promise<Array<Course>> => {
  const query: CourseResult = await client.query('SELECT * FROM "courses";');
  return query.rows;
};

export default { create, read };
