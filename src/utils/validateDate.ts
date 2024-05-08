import { IBookReview } from "./types";
import { DateValidationResult } from "./constants";

const validateDate = (review: IBookReview) => {
  
  if ((review.cat === "read" || review.cat === "reading") && !review.startDate) {
    return DateValidationResult.NO_START_DATE;
  }
  if (review.endDate && review.startDate && review.endDate < review.startDate) {
    return DateValidationResult.INVALID_DATE_RANGE;
  }
  return DateValidationResult.VALID;
}

export default validateDate;