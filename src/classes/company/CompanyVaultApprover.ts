import { CompanyMember } from "./CompanyMember";

export class CompanyVaultApprover extends CompanyMember {
  budgetUsd = 0;

  constructor(member: CompanyMember) {
    super(member.name, member.address, member.role);
    this.budgetUsd = 0;
  }

  setBudgetUsd = (budgetUsd: number) => {
    this.budgetUsd = budgetUsd;
  };
}
