import { Review } from "../types/review";
import { DATE_VALIDATION_RESULT } from "../constants/dateValidationResult";
import { notify } from "../components/ui/Toast";

interface ValidationResultProp {
  saveReview: (newReview: Review) => void;
  validationResult: string;
  newReview: Review
}
const handleValidationResult = ({ saveReview, validationResult, newReview }: ValidationResultProp) => {
  switch (validationResult) {
    case DATE_VALIDATION_RESULT.VALID:
      saveReview(newReview);
      break;
    case DATE_VALIDATION_RESULT.NO_START_DATE:
      notify({ type: "error", text: "시작일을 설정해 주세요." });
      break;
    case DATE_VALIDATION_RESULT.INVALID_DATE_RANGE:
      notify({ type: "error", text: "종료일은 시작일보다 빠를 수 없습니다." });
      break;
    default:
      notify({ type: "error", text: "다시 시도해 주세요." });
  }
};

export default handleValidationResult