import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IBookReview } from "../utils/types";
import { bookDataState, bookReviewState } from "../state/atoms";

import NoBook from "../components/NoBook";
import Header from "../components/layout/Header";
import Nav from "../components/layout/Nav";
import BookList from "../components/BookList";
import DateSelector from "../components/statistics/DateSelector";
import ReadingStatsChartProps from "../components/statistics/ReadingStatsChart";
import BookCountByDate from "../components/statistics/BookCountByDate";


function Statistics() {
  const bookReviews = useRecoilValue(bookReviewState);
  const readReviews = bookReviews.filter(review => review.cat === "read");
  const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  // 읽은 책 중에서 년도만 담은 배열
  const startYears = readReviews.map(review => review.startDate.slice(0, 4));

  // 중복 제거
  const uniqueStartYears = [...new Set(startYears)];

  // 읽은 책 중에서 가장 최근 년도
  const recentYear = uniqueStartYears.reduce((max, current) => {
    return current > max ? current : max;
  });

  // 오늘과 년+월이 같은 리뷰  
  const today = new Date();
  const currentYear = String(today.getFullYear());
  const currentMonth = `${today.getMonth() + 1 < 10 ? '0' : ''}${today.getMonth() + 1}`;
  const currentYearAndMonth = `${currentYear}-${currentMonth}`;
  const matchingCurrentDateReviews = readReviews.filter(review => review.startDate.slice(0, 7) === currentYearAndMonth);

  const [selectedYear, setSelectedYear] = useState(recentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // 선택한 년도와 맞는 리뷰
  const matchingYearReviews = readReviews.filter(review => review.startDate.slice(0, 4) === selectedYear);

  // 선택한 년+월과 맞는 리뷰
  const matchingYearMonthReviews = readReviews.filter(review => review.startDate.slice(0, 7) === `${selectedYear}-${selectedMonth}`);

  // 선택한 년도의 1월~12월 리뷰 배열
  const reviewsCountByMonth: number[] = [];
  for (let i = 1; i <= 12; i++) {
    const month = i < 10 ? `0${i}` : `${i}`;
    const filterCondition = `${selectedYear}-${month}`;

    const matchingReviews = readReviews.filter(review => review.startDate.slice(0, 7) === filterCondition);

    reviewsCountByMonth.push(matchingReviews.length);
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = e.target.value;
    setSelectedYear(selectedYear);
  }
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMonth = e.target.value;
    setSelectedMonth(selectedMonth);
  }

  const navigate = useNavigate();
  const setBookData = useSetRecoilState(bookDataState);
  const onBoxClicked = ({ img, title, authors, publisher, id }: IBookReview) => {
    setBookData({ thumbnail: img, title, authors, publisher, id });
    navigate(`/record/${id}`);
  };

  return (
    <>
      {bookReviews.length > 0 ? (
        <>
          <Header text={`이번 달에는
            ${matchingCurrentDateReviews.length}권의 책을 읽었어요.
          `} />

          <div className="layout mb-40">
            <div className="flex justify-center items-center gap-3 mb-4">
              <DateSelector
                handleChange={handleYearChange}
                value={selectedYear}
                arr={uniqueStartYears}
              />
              <BookCountByDate num={matchingYearReviews.length} />
            </div>
            <ReadingStatsChartProps categories={months} data={reviewsCountByMonth} />

            <div className="flex justify-center items-center gap-3 mt-12 mb-4">
              <DateSelector
                handleChange={handleMonthChange}
                value={selectedMonth}
                arr={months}
              />
              <BookCountByDate num={matchingYearMonthReviews.length} />
            </div>
            {matchingYearMonthReviews.length > 0 ? (
              matchingYearMonthReviews.map((item: IBookReview) => (
                <div key={item.id}>
                  <BookList
                    onBoxClicked={() => onBoxClicked(item)}
                    thumbnail={item.img}
                    title={item.title}
                    authors={item.authors}
                    publisher={item.publisher}
                  />
                </div>
              ))
            ) : (
              <div className="bg-slate-200 text-center p-6">작성된 리뷰가 없습니다.</div>
            )}
          </div>
        </>
      ) : (
        <>
          <Header text="서재에 기록된 책이 없어요.
          좋아하는 책을 기록해 보세요." />
          <NoBook />
        </>
      )}
      <Nav />
    </>
  )
};

export default Statistics;