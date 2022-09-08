export interface CustomErrorObj {
  message: string;
  status: number;
  name: string;
}

export enum ErrorCodes {
  NOT_FOUND = 404,
  UN_AUTHORIZED = 403,
}

export enum ErrorMessages {
  NOT_FOUND = "Resource does not exist",
  UN_AUTHORIZED = "You are not authorized to access this resource",
  GENERAL = "Error! Please try Again",
}
