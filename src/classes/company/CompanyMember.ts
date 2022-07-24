import { nanoid } from "nanoid";
export class CompanyMember {
  id: string;
  name = "";
  address = "";
  role = "";
  budgetUsd = 0;

  constructor(name?: string, address?: string, role?: string) {
    this.id = nanoid(5);
    this.name = name ?? "";
    this.address = address ?? "";
    this.role = role ?? "";
  }

  setName = (name: string) => {
    this.name = name;
  };

  setAddress = (address: string) => {
    this.address = address;
  };

  setRole = (role: string) => {
    this.role = role;
  };

  setBudgetUsd = (budget: number) => {
    this.budgetUsd = budget;
  };

  clone = () => {
    return new CompanyMember(this.name, this.address, this.role);
  };
}
