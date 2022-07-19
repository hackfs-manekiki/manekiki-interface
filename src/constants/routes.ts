export enum Route {
  HOME = "/",
  SELECT_COMPANY = "/company/select",
  CREATE_COMPANY = "/company/create",
}

type RouteType = "FOOTER_HIDDEN" | "FOOTER_SHOWN" | "HEADER_HIDDEN" | "HEADER_SHOWN";

export const Routes: Record<RouteType, (Route | RegExp | string)[]> = {
  FOOTER_HIDDEN: [Route.HOME, Route.SELECT_COMPANY, Route.CREATE_COMPANY], // [Route.HOME],
  FOOTER_SHOWN: [],
  HEADER_HIDDEN: [],
  HEADER_SHOWN: [],
};
