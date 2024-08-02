import { useState, useMemo } from "react";
import { Review } from "../../../types/review";
import { getCurrentDateInfo } from "../../../utils/dateFormat";

// 읽은 책 리뷰의 날짜에서 중복 값을 제거한 나머지를 추출하는 함수
const extractUniqueValues = (reviews: Review[], sliceFn: (date: Date) => number) => 
  [...new Set(reviews.map(review => sliceFn(review.startDate)))];

// 읽은 책 리뷰의 날짜에서 가장 최근 날짜를 찾는 함수
const findMostRecent = (values: number[], defaultValue: number) => 
  values.length ? values.reduce((max, current) => current > max ? current : max) : defaultValue;

export const useDateFilteredReviews = (readReviews: Review[]) => {
  const { currentYear, currentMonth } = getCurrentDateInfo();
  
  const uniqueStartYears = useMemo(() => extractUniqueValues(readReviews, date => date.getFullYear()), [readReviews]);
  const recentYear = useMemo(() => findMostRecent(uniqueStartYears, currentYear), [uniqueStartYears, currentYear]);
  const reviewsInRecentYear = useMemo(() => readReviews.filter(review => new Date(review.startDate).getFullYear() === recentYear), [readReviews, recentYear]);

  const uniqueStartMonths = useMemo(() => extractUniqueValues(reviewsInRecentYear, date => date.getMonth() + 1), [reviewsInRecentYear]);
  const recentMonth = useMemo(() => findMostRecent(uniqueStartMonths, currentMonth), [uniqueStartMonths, currentMonth]);

  const [selectedYear, setSelectedYear] = useState(recentYear);
  const [selectedMonth, setSelectedMonth] = useState(recentMonth);

  // 선택한 연도와 맞는 리뷰
  const matchingYearReviews = useMemo(() => 
    readReviews.filter(review => review.startDate.getFullYear() === selectedYear),
    [readReviews, selectedYear]
  );

  // 선택한 년+월과 맞는 리뷰
  const matchingYearMonthReviews = useMemo(() => 
    readReviews.filter(review => 
      review.startDate.getFullYear() === selectedYear &&
      review.startDate.getMonth() + 1 === selectedMonth
    ),
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