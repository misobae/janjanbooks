import { useState, useMemo } from "react";
import { Review } from "../../../types/review";
import { getCurrentDateInfo } from "../../../utils/dateFormat";

// 읽은 책 리뷰의 날짜에서 중복 값을 제거한 나머지를 추출하는 함수
const extractUniqueValues = (reviews: Review[], sliceFn: (date: string) => string) => 
  [...new Set(reviews.map(review => sliceFn(review.startDate)))];

// 읽은 책 리뷰의 날짜에서 가장 최근 날짜를 찾는 함수
const findMostRecent = (values: string[], defaultValue: string) => 
  values.length ? values.reduce((max, current) => current > max ? current : max) : defaultValue;

export const useDateFilteredReviews = (readReviews: Review[]) => {
  const { currentYear, currentMonth } = getCurrentDateInfo();

  const uniqueStartYears = useMemo(() => extractUniqueValues(readReviews, date => date.slice(0, 4)), [readReviews]);
  const uniqueStartMonths = useMemo(() => extractUniqueValues(readReviews, date => date.slice(5, 7)), [readReviews]);

  const recentYear = useMemo(() => findMostRecent(uniqueStartYears, currentYear), [uniqueStartYears, currentYear]);
  const recentMonth = useMemo(() => findMostRecent(uniqueStartMonths, currentMonth), [uniqueStartMonths, currentMonth]);

  const [selectedYear, setSelectedYear] = useState(recentYear);
  const [selectedMonth, setSelectedMonth] = useState(recentMonth);

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