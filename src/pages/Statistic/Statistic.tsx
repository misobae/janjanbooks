import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Review } from "../../types/review";
import { getCurrentDateInfo } from "../../utils/dateFormat";
import { bookState } from "../../recoil/book";
import { bookReviewState } from "../../recoil/review";

import BookListItem from "../../components/ui/list/BookListItem";
import NoBook from '../../components/common/NoBook';
import DateSelector from "./components/DateSelector";
import ReadingStatsChart from "./components/ReadingStatsChart";
import BookCountByDate from "./components/BookCountByDate";


function Statistic() {
  const bookReviews = useRecoilValue(bookReviewState);
  const readReviews = bookReviews.filter(review => review.cat === "read");
  if (readReviews.length === 0) {
    return <NoBook />;
  }

  // 읽은 책 중에서 년도만 담은 배열
  const startYears = readReviews.map(review => review.startDate.slice(0, 4));

  // 중복 제거
  const uniqueStartYears = [...new Set(startYears)];

  // 읽은 책 중에서 가장 최근 년도
  const recentYear = uniqueStartYears.reduce((max, current) => {
    return current > max ? current : max;
  });

  const { currentMonth } = getCurrentDateInfo();

  const [selectedYear, setSelectedYear] = useState(recentYear);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // 선택한 년도와 맞는 리뷰
  const matchingYearReviews = useMemo(() => 
    readReviews.filter(review => review.startDate.slice(0, 4) === selectedYear),
    [readReviews, selectedYear]
  )

  // 선택한 년+월과 맞는 리뷰
  const matchingYearMonthReviews = useMemo(() => 
    readReviews.filter(review => review.startDate.slice(0, 7) === `${selectedYear}-${selectedMonth}`),
    [readReviews, selectedYear, selectedMonth]
  );

  // 선택한 년도의 1월~12월 리뷰 배열
  const monthsArray = Array.from({ length: 12 }, (_, i) => `${i + 1}`.padStart(2, '0'));
  const getReviewsCountByMonth = (year: string, reviews: Review[]) => {
    return monthsArray.map((month) => {
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

  const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };
  const handleChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const navigate = useNavigate();
  const setBookData = useSetRecoilState(bookState);
  const handleBookClick = ({ img, title, authors, publisher, id }: Review) => {
    setBookData({ thumbnail: img, title, authors, publisher, id });
    navigate(`/record/${id}`);
  };

  return (
    <div className="layout mb-40">
      <div className="flex justify-center items-center gap-3 mb-4">
        <DateSelector
          handleChange={handleChangeYear}
          value={selectedYear}
          arr={uniqueStartYears}
          dateUnit="년"
        />
        <BookCountByDate num={matchingYearReviews.length} />
      </div>
      <ReadingStatsChart data={dataForChart} />

      <div className="flex justify-center items-center gap-3 mt-12 mb-4">
        <DateSelector
          handleChange={handleChangeMonth}
          value={selectedMonth}
          arr={monthsArray}
          dateUnit="월"
        />
        <BookCountByDate num={matchingYearMonthReviews.length} />
      </div>
      {matchingYearMonthReviews.length > 0 ? (
        matchingYearMonthReviews.map((item: Review) => (
          <div key={item.id}>
            <BookListItem
              handleBookClick={() => handleBookClick(item)}
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
  )
};

export default Statistic;