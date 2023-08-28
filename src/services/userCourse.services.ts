import format from "pg-format";
import { client } from "../database";
import {
  UserCourse,
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

const addCourse = async (courseId: string, userId: string): Promise<void> => {
  await client.query(
    'INSERT INTO "userCourses" ("courseId", "userId") VALUES ($1, $2);',
    [courseId, userId]
  );
};

export default { create, read, addCourse };
