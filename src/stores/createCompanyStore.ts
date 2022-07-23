import clamp from "lodash.clamp";
import { autorun, makeAutoObservable } from "mobx";
import { CompanyMember } from "src/classes/company/CompanyMember";
import { CompanyVault } from "src/classes/company/CompanyVault";
import { isBrowser } from "src/utils/isBrowser";
import { plainToInstance } from "class-transformer";

class CreateCompanyStore {
  constructor() {
    if (isBrowser) {
      const storedValueString = localStorage.getItem("createCompanyStore") ?? "";
      try {
        const storedValue = JSON.parse(storedValueString);
        this.activeStep = storedValue.activeStep;
        this.companyName = storedValue.companyName;
        this.owner = storedValue.owner ?? new CompanyMember();
        // this.owner = plainToInstance(CompanyMember, storedValue.owner as object);
        this.vaults = plainToInstance(CompanyVault, storedValue.vaults);
        // this.vaults = storedValue.vaults.map((vault: any) => plainToInstance(CompanyVault, vault));
        this.members = plainToInstance(CompanyMember, storedValue.members);
        // this.members = storedValue.members.map((member: any) =>
        //   plainToInstance(CompanyMember, member),
        // );
      } catch {
        this.activeStep = 0;
        this.companyName = "";
        this.owner = new CompanyMember();
        this.vaults = [];
        this.members = [];
      }
      makeAutoObservable(this);
    }
  }

  activeStep: number = 0;
  companyName = "";
  owner: CompanyMember = new CompanyMember();
  vaults: CompanyVault[] = [];
  members: CompanyMember[] = [];

  setCompanyName = (companyName: string) => {
    this.companyName = companyName;
  };

  addVault = (name: string) => {
    this.vaults = [...this.vaults, new CompanyVault(name)];
  };

  removeVault = (vault: CompanyVault) => {
    this.vaults = this.vaults.filter((v) => v.name !== vault.name);
  };

  setOwnerName = (name: string) => {
    this.owner.name = name;
  };

  setOwnerAddress = (address: string) => {
    this.owner.address = address;
  };

  setOwnerRole = (role: string) => {
    this.owner.role = role;
  };

  addMember = (name?: string, role?: string) => {
    this.members = [...this.members, new CompanyMember(name, role)];
  };

  removeMember = (member: CompanyMember) => {
    this.members = this.members.filter((m) => m.id !== member.id);
  };

  setMemberName = (member: CompanyMember, name: string) => {
    member.setName(name);
    this.members = [...this.members];
  };
  setMemberAddress = (member: CompanyMember, address: string) => {
    member.setAddress(address);
    this.members = [...this.members];
  };

  setMemberRole = (member: CompanyMember, role: string) => {
    member.setRole(role);
    this.members = [...this.members];
  };

  // vault admins
  addAdminToVault = (vault: CompanyVault, admin: CompanyMember = new CompanyMember()) => {
    vault.addAdmin(admin);
    this.vaults = [...this.vaults];
  };

  changeAdminOfVault = (vault: CompanyVault, fromId: string, toId: string) => {
    if (vault.admins.some((admin) => admin.id === toId)) {
      // target exist, just remove `from`
      vault.removeAdminById(fromId);
    } else {
      const fromIndex = vault.admins.findIndex((admin) => admin.id === fromId);
      const toAdmin = this.members.find((member) => member.id === toId);
      if (fromIndex !== -1 && toAdmin) {
        vault.admins[fromIndex] = toAdmin;
        vault.removeApproverById(toId);
        vault.removeEmployeeById(toId);
      }
    }
    this.vaults = [...this.vaults];
  };

  removeAdminFromVault = (vault: CompanyVault, admin: CompanyMember) => {
    vault.removeAdmin(admin);
    this.vaults = [...this.vaults];
  };

  // vault approvers
  addApproverToVault = (vault: CompanyVault, approver: CompanyMember = new CompanyMember()) => {
    vault.addApprover(approver);
    this.vaults = [...this.vaults];
  };

  changeApproverOfVault = (vault: CompanyVault, fromId: string, toId: string) => {
    if (vault.approvers.some((approver) => approver.id === toId)) {
      // target exist, just remove `from`
      vault.removeApproverById(fromId);
    } else {
      const fromIndex = vault.approvers.findIndex((approver) => approver.id === fromId);
      const toApprover = this.members.find((member) => member.id === toId);
      if (fromIndex !== -1 && toApprover) {
        vault.approvers[fromIndex] = toApprover;
        vault.removeEmployeeById(toId);
      }
    }
    this.vaults = [...this.vaults];
  };

  setVaultApproverBudget = (vault: CompanyVault, approverId: string, budgetUsd: number) => {
    const approver = vault.approvers.find((_approver) => _approver.id === approverId);
    if (approver) {
      // approver.setBudgetUsd(budgetUsd);
      approver.budgetUsd = budgetUsd;
      this.vaults = [...this.vaults];
    }
  };

  removeApproverFromVault = (vault: CompanyVault, approver: CompanyMember) => {
    vault.removeApprover(approver);
    this.vaults = [...this.vaults];
  };

  // vault employees
  addEmployeeToVault = (vault: CompanyVault, employee: CompanyMember = new CompanyMember()) => {
    vault.addEmployee(employee);
    this.vaults = [...this.vaults];
  };

  changeEmployeeOfVault = (vault: CompanyVault, fromId: string, toId: string) => {
    if (vault.employees.some((employee) => employee.id === toId)) {
      // target exist, just remove `from`
      vault.removeEmployeeById(fromId);
    } else {
      const fromIndex = vault.employees.findIndex((employee) => employee.id === fromId);
      const toEmployee = this.members.find((member) => member.id === toId);
      if (fromIndex !== -1 && toEmployee) {
        vault.employees[fromIndex] = toEmployee;
      }
    }
    this.vaults = [...this.vaults];
  };

  removeEmployeeFromVault = (vault: CompanyVault, employee: CompanyMember) => {
    vault.removeEmployee(employee);
    this.vaults = [...this.vaults];
  };

  // Steps
  setActiveStep = (activeStep: number) => {
    this.activeStep = clamp(activeStep, 0, 4);
  };
  previousStep = () => {
    this.activeStep = clamp(this.activeStep - 1, 0, 4);
  };
  nextStep = () => {
    this.activeStep = clamp(this.activeStep + 1, 0, 4);
  };

  reset = () => {
    this.activeStep = 0;
    this.companyName = "";
    this.vaults = [];
    this.owner = new CompanyMember();
    this.members = [];
  };
}

const createCompanyStore = new CreateCompanyStore();

autorun(() => {
  if (isBrowser) {
    const jsonString = JSON.stringify(createCompanyStore);
    localStorage.setItem("createCompanyStore", jsonString);
  }
});

export { createCompanyStore };
