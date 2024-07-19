import { useState, useMemo } from "react";
import { Review } from "../types/review";
import { getCurrentDateInfo } from "../utils/dateFormat";

export const useDateFilteredReviews = (readReviews: Review[]) => {
  // 읽은 책 중에서 연도만 담은 배열
  const startYears = useMemo(() => readReviews.map(review => review.startDate.slice(0, 4)), [readReviews]);

  // 중복 연도 제거
  const uniqueStartYears = useMemo(() => [...new Set(startYears)], [startYears]);

  // 읽은 책 중에서 가장 최근 연도
  const recentYear = useMemo(() => 
    uniqueStartYears.reduce((max, current) => current > max ? current : max),
    [uniqueStartYears]
  );

  const { currentMonth } = getCurrentDateInfo();

  const [selectedYear, setSelectedYear] = useState(recentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // 선택한 연도와 맞는 리뷰
  const matchingYearReviews = useMemo(() => 
    readReviews.filter(review => review.startDate.slice(0, 4) === selectedYear),
    [readReviews, selectedYear]
  );

  // 선택한 년+월과 맞는 리뷰
  const matchingYearMonthReviews = useMemo(() => 
    readReviews.filter(review => review.startDate.slice(0, 7) === `${selectedYear}-${selectedMonth}`),
    [readReviews, selectedYear, selectedMonth]
  );

  return {
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    uniqueStartYears,
    matchingYearReviews,
    matchingYearMonthReviews,
  };
};