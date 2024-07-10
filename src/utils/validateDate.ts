import { Review } from "../types/review";
import { DATE_VALIDATION_RESULT } from "../constants/dateValidationResult";

const validateDate = ({ cat, startDate, endDate }: Review) => {
  
  if ((cat === "read" || cat === "reading") && !startDate) {
    return DATE_VALIDATION_RESULT.NO_START_DATE;
  }
  if (endDate && startDate && endDate < startDate) {
    return DATE_VALIDATION_RESULT.INVALID_DATE_RANGE;
  }
  return DATE_VALIDATION_RESULT.VALID;
}

export default validateDate;