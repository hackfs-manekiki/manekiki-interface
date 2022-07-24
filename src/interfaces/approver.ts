import type { Member } from "./member";

export interface Approver extends Member {
  budget: number;
}
