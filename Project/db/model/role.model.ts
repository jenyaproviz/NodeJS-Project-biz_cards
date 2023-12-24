import { roleSchema } from "./../schema/role.schema";
import { model } from "mongoose";

const Role = model("Role", roleSchema);

export { Role };
