import type { CompanyMember } from "./CompanyMember";
import type { CompanyVaultApprover } from "./CompanyVaultApprover";

export class CompanyVault {
  name = "";
  admin: CompanyMember | null = null;
  approvers: CompanyVaultApprover[] = [];
  employees: CompanyMember[] = [];

  constructor(name: string) {
    this.name = name;
  }

  setAdmin = (admin: CompanyMember) => {
    this.admin = admin;
  };

  addApprover = (approver: CompanyVaultApprover) => {
    this.approvers.push(approver);
  };

  addEmployee = (employee: CompanyMember) => {
    this.employees.push(employee);
  };

  removeApprover = (approver: CompanyVaultApprover) => {
    this.approvers = this.approvers.filter((a) => a.name !== approver.name);
  };

  removeEmployee = (employee: CompanyMember) => {
    this.employees = this.employees.filter((e) => e.name !== employee.name);
  };
}
