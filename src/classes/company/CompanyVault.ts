import { CompanyMember } from "./CompanyMember";

export class CompanyVault {
  name = "";
  admins: CompanyMember[] = [];
  approvers: CompanyMember[] = [];
  employees: CompanyMember[] = [];

  constructor(name: string) {
    this.name = name;
  }

  // setAdmin = (admin: CompanyMember) => {
  //   this.admin = admin;
  // };

  // Admins
  addAdmin = (admin: CompanyMember = new CompanyMember()) => {
    this.admins = [...this.admins, admin];
  };

  removeAdmin = (admin: CompanyMember) => {
    this.admins = this.admins.filter((a) => a.id !== admin.id);
  };

  removeAdminById = (id: string) => {
    this.admins = this.admins.filter((a) => a.id !== id);
  };

  // Approvers
  addApprover = (approver: CompanyMember) => {
    this.approvers.push(approver);
  };

  removeApprover = (approver: CompanyMember) => {
    this.approvers = this.approvers.filter((a) => a.name !== approver.name);
  };

  removeApproverById = (id: string) => {
    this.approvers = this.approvers.filter((a) => a.id !== id);
  };

  // Employees
  addEmployee = (employee: CompanyMember) => {
    this.employees.push(employee);
  };

  removeEmployee = (employee: CompanyMember) => {
    this.employees = this.employees.filter((e) => e.id !== employee.id);
  };

  removeEmployeeById = (id: string) => {
    this.employees = this.employees.filter((e) => e.id !== id);
  };
}
