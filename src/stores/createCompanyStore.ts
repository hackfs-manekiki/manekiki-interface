import clamp from "lodash.clamp";
import { autorun, makeAutoObservable } from "mobx";
import { CompanyVault } from "src/classes/company/CompanyVault";
import { isBrowser } from "src/utils/isBrowser";

class CreateCompanyStore {
  constructor() {
    if (isBrowser) {
      const storedValueString = localStorage.getItem("createCompanyStore") ?? "";
      try {
        const storedValue = JSON.parse(storedValueString);
        this.activeStep = storedValue.activeStep;
        this.companyName = storedValue.companyName;

        this.vaults = storedValue.vaults;
      } catch {
        this.activeStep = 0;
        this.companyName = "";

        this.vaults = [];
      }
    }
    makeAutoObservable(this);
  }

  activeStep: number = 0;
  companyName = "";
  vaults: CompanyVault[] = [];

  setCompanyName = (companyName: string) => {
    this.companyName = companyName;
  };

  addVault = (name: string) => {
    this.vaults = [...this.vaults, new CompanyVault(name)];
  };

  removeVault = (vault: CompanyVault) => {
    this.vaults = this.vaults.filter((v) => v.name !== vault.name);
  };

  setActiveStep = (activeStep: number) => {
    this.activeStep = clamp(activeStep, 0, 4);
  };
  previousStep = () => {
    this.activeStep = clamp(this.activeStep - 1, 0, 4);
  };
  nextStep = () => {
    this.activeStep = clamp(this.activeStep + 1, 0, 4);
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
