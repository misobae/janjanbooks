import { useMemo } from "react";

import { Review } from "../../../types/review";
import { MONTH } from "../../../constants/month"

export const useChartData = (selectedYear: string, readReviews: Review[]) => {
  
  const getReviewsCountByMonth = (year: string, reviews: Review[]) => {
    return MONTH.map((month) => {
      const filterCondition = `${year}-${month}`;
      const matchingReviews = reviews.filter(review => review.startDate.startsWith(filterCondition));
      const monthName = month.startsWith('0') ? month.substring(1) : month;

      return {
        x: `${monthName}월`,
        y: matchingReviews.length
      };
    });
  };
  
  const reviewsCountByMonth = useMemo(() => 
    getReviewsCountByMonth(selectedYear, readReviews),
    [selectedYear, readReviews]
  );

  const dataForChart = [{
    "id": "reviewsCountByMonth",
    "color": "hsl(228, 79%, 47%)",
    "data": reviewsCountByMonth
  }];

  return dataForChart;
}