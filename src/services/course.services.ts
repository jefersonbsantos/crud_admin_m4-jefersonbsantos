import format from "pg-format";
import { client } from "../database";
import {
  Course,
  CourseCreate,
  CourseResult,
} from "../interfaces/course.interfaces";
import AppError from "../errors/AppError";

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

const retrieve = async (id: string) => {
  const getId: string = `
    SELECT 
      "u"."id" AS "userId",
      "u"."name" AS "userName",
      "c"."id" AS "courseId",
      "c"."name" AS "courseName",
      "c"."description" AS "courseDescription",
      "uc"."active" AS "userActiveInCourse"
    FROM
      "users" AS "u"
    JOIN
      "userCourses" AS "uc"
    ON
      "u"."id" = "uc"."userId"  
    JOIN
      "courses" AS "c"
    ON
      "c"."id" = "uc"."courseId"  
    WHERE
      "c"."id" = $1;  
  `;

  const query = await client.query(getId, [id]);

  if (!query.rowCount) throw new AppError("No course found", 404);

  return query.rows;
};

export default { create, read, retrieve };
