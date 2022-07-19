export class CompanyMember {
  name = "";
  role = "";
  constructor(name: string, role?: string) {
    this.name = name;
    this.role = role ?? "member";
  }
}
