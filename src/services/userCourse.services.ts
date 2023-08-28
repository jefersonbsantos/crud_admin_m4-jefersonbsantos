import format from "pg-format";
import { client } from "../database";
import { QueryResult } from "pg";
import AppError from "../errors/AppError";
import {
  UserCourse,
  UserCourseAddCourse,
  UserCourseCreate,
  UserCourseRead,
  UserCourseResult,
} from "../interfaces/userCourse.interfaces";

const create = async (
  payload: UserCourseCreate,
  userId: string
): Promise<UserCourse> => {
  const queryFormat: string = format(
    'INSERT INTO "userCourses" (%I, "userId") VALUES (%L, $1) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: UserCourseResult = await client.query(queryFormat, [userId]);
  return query.rows[0];
};

const read = async (admin: boolean): Promise<UserCourseRead> => {
  if (!admin) {
    const queryString: string = `
      SELECT
        "c".*, "u"."name"
      FROM "courses" "c"
      JOIN "users" "u"
        ON "c"."userId" = "u"."id"
      WHERE "c"."privacy" = 'public';
    `;

    const query: UserCourseResult = await client.query(queryString);
    return query.rows;
  }

  const queryString: string = `
    SELECT
      "m".*, "u"."username"
    FROM "userCourses" "m"
    JOIN "users" "u"
      ON "p"."userId" = "u"."id";
  `;

  const query: UserCourseResult = await client.query(queryString);
  return query.rows;
};

const addCourse = async (
  payload: UserCourseAddCourse,
  courseId: string
): Promise<string> => {
  const query: QueryResult = await client.query(
    'SELECT * FROM "userCourses" WHERE "courseId" = $1 AND "userId" = $2;',
    [payload.courseId, courseId]
  );

  if (query.rowCount !== 0) {
    throw new AppError("User/course not found", 404);
  }

  await client.query(
    'INSERT INTO "userCourses" ("courseId", "userId") VALUES ($1, $2);',
    [payload.courseId, courseId]
  );

  return "User successfully vinculed to course";
};

export default { create, read, addCourse };
