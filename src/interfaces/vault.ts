import type { Admin } from "./admin";
import type { Approver } from "./approver";
import type { Member } from "./member";

export interface Vault {
  address: string;
  name: string;
  owner: string;
  admins: Admin[];
  approvers: Approver[];
  members: Member[];
}
