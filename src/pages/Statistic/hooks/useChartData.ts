import { useMemo } from "react";

import { Review } from "../../../types/review";
import { MONTH } from "../../../constants/month"

// 연도+월이 일치하는 리뷰 필터링 함수
const filterReviewsByMonthAndYear = (reviews: Review[], year: number, month: number) => {
  return reviews.filter(review => {
    const reviewDate = new Date(review.startDate);
    return reviewDate.getFullYear() === year && reviewDate.getMonth() === month - 1;
  });
};

const getReviewsCountByMonth = (year: number, reviews: Review[]) => {
  return MONTH.map((month) => {
    const matchingReviews = filterReviewsByMonthAndYear(reviews, year, month);
    return {
      x: `${month}월`,
      y: matchingReviews.length
    };
  });
};

export const useChartData = (selectedYear: number, readReviews: Review[]) => {
  const reviewsCountByMonth = useMemo(() => 
    readReviews.length > 0 ? getReviewsCountByMonth(selectedYear, readReviews) : [],
    [selectedYear, readReviews]
  );

  const dataForChart = [{
    "id": "reviewsCountByMonth",
    "color": "hsl(228, 79%, 47%)",
    "data": reviewsCountByMonth
  }];

  return dataForChart;
};