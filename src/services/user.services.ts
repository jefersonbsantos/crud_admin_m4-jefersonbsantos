import format from "pg-format";
import { client } from "../database";
import {
  User,
  UserCreate,
  UserRead,
  UserResult,
  UserUpdate,
} from "../interfaces/user.interfaces";

const create = async (payload: UserCreate): Promise<User> => {
  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: UserResult = await client.query(queryFormat);
  return query.rows[0];
};

const read = async (): Promise<UserRead> => {
  const query: UserResult = await client.query('SELECT * FROM "users";');
  return query.rows;
};

const partialUpdate = async (
  userId: string,
  payload: UserUpdate
): Promise<User> => {
  const queryFormat: string = format(
    'UPDATE "users" SET (%I) = ROW (%L) WHERE "id" = $1 RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );

  const query: UserResult = await client.query(queryFormat, [userId]);
  return query.rows[0];
};

const deleteUser = async (userId: string): Promise<void> => {
  await client.query('DELETE FROM "users" WHERE "id" = $1', [userId]);
};

export default { create, read, partialUpdate, deleteUser };
