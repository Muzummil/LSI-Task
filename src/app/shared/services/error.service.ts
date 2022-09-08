import { Injectable } from "@angular/core";
import { CustomErrorObj, ErrorCodes, ErrorMessages } from "../interfaces/error";

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  constructor() {}

  public getErrorMessage(error: CustomErrorObj): string {
    switch (error.status) {
      case ErrorCodes.NOT_FOUND:
        return ErrorMessages.NOT_FOUND;
      case ErrorCodes.NOT_FOUND:
        return ErrorMessages.NOT_FOUND;
      default:
        return ErrorMessages.GENERAL;
    }
  }
}
