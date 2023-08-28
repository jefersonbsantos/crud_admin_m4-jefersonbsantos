import format from "pg-format";
import { client } from "../database";
import {
  User,
  UserCreate,
  UserRead,
  UserResult,
  UserReturn,
} from "../interfaces/user.interfaces";
import {
  userPasswordArraySchema,
  userPasswordSchema,
} from "../schemas/user.schemas";
import { hash } from "bcryptjs";
import { error } from "console";
import AppError from "../errors/AppError";

const create = async (payload: UserCreate): Promise<UserReturn> => {
  payload.password = await hash(payload.password, 10);
  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: UserResult = await client.query(queryFormat);
  return userPasswordSchema.parse(query.rows[0]);
};

const read = async (): Promise<UserReturn[]> => {
  const query: UserResult = await client.query('SELECT * FROM "users";');
  return userPasswordArraySchema.parse(query.rows);
};

const retrieve = async (id: string) => {
  const getId: string = `
    SELECT 
      "c"."id" AS "courseId",
      "c"."name" AS "courseName",
      "c"."description" AS "courseDescription",
      "uc"."active" AS "userActiveInCourse",
      "u"."id" AS "userId",
      "u"."name" AS "userName"
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
      "u"."id" = $1;  
  `;

  const query = await client.query(getId, [id]);

  if (!query.rowCount) throw new AppError("No course found", 404);

  return query.rows;
};

const deleteUser = async (userId: string): Promise<void> => {
  await client.query('DELETE FROM "courses" WHERE "id" = $1', [userId]);
};

export default { create, read, retrieve, deleteUser };
