import { IBookReview } from "./types";
import { DateValidationResult } from "./constants";
import { notify } from "../components/common/Toast";

interface ValidationResultProp {
  saveReview: (newReview: IBookReview) => void;
  validationResult: string;
  newReview: IBookReview
}
const handleValidationResult = ({ saveReview, validationResult, newReview }: ValidationResultProp) => {
  switch (validationResult) {
    case DateValidationResult.VALID:
      saveReview(newReview);
      break;
    case DateValidationResult.NO_START_DATE:
      notify({ type: "error", text: "시작일을 설정해 주세요." });
      break;
    case DateValidationResult.INVALID_DATE_RANGE:
      notify({ type: "error", text: "종료일은 시작일보다 빠를 수 없습니다." });
      break;
    default:
      notify({ type: "error", text: "다시 시도해 주세요." });
  }
};

export default handleValidationResult