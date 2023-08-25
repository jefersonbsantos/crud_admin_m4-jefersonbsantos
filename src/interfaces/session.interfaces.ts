import { z } from "zod";
import { sessionCreate } from "../schemas/session.schemas";

type SessionCreate = z.infer<typeof sessionCreate>;
type SessionReturn = { token: string };

export { SessionCreate, SessionReturn };
