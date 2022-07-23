export enum Route {
  HOME = "/",
  SELECT_COMPANY = "/select-company",
  CREATE_COMPANY = "/create-company",
}

type RouteType =
  | "FOOTER_HIDDEN"
  | "FOOTER_SHOWN"
  | "HEADER_HIDDEN"
  | "HEADER_SHOWN"
  | "SIDEBAR_HIDDEN";

export const Routes: Record<RouteType, (Route | RegExp | string)[]> = {
  FOOTER_HIDDEN: [Route.HOME, Route.SELECT_COMPANY, Route.CREATE_COMPANY], // [Route.HOME],
  SIDEBAR_HIDDEN: [Route.HOME, Route.SELECT_COMPANY, Route.CREATE_COMPANY], // [Route.HOME],
  FOOTER_SHOWN: [],
  HEADER_HIDDEN: [],
  HEADER_SHOWN: [],
};
