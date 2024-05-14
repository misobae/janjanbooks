import { IBookReview } from "./types";
import { DateValidationResult } from "./constants";

const validateDate = ({ cat, startDate, endDate }: IBookReview) => {
  
  if ((cat === "read" || cat === "reading") && !startDate) {
    return DateValidationResult.NO_START_DATE;
  }
  if (endDate && startDate && endDate < startDate) {
    return DateValidationResult.INVALID_DATE_RANGE;
  }
  return DateValidationResult.VALID;
}

export default validateDate;