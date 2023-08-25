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
        "p".*, "u"."username"
      FROM "playlists" "p"
      JOIN "users" "u"
        ON "p"."userId" = "u"."id"
      WHERE "p"."privacy" = 'public';
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
  playlistId: string
): Promise<string> => {
  const query: QueryResult = await client.query(
    'SELECT * FROM "userCourses" WHERE "courseId" = $1 AND "userCourseId" = $2;',
    [payload.courseId, playlistId]
  );

  if (query.rowCount !== 0) {
    throw new AppError("Course already added to user.", 409);
  }

  await client.query(
    'INSERT INTO "userCourses" ("courseId", "userCourseId") VALUES ($1, $2);',
    [payload.courseId, playlistId]
  );

  return "Course added to user.";
};

export default { create, read, addCourse };
