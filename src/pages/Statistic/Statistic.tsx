import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";

import { Review } from "../../types/review";
import { bookState } from "../../recoil/book";
import { MONTH } from "../../constants/month"
import { useReadReviews } from "./hooks/useReadReviews";
import { useDateFilteredReviews } from "./hooks/useDateFilteredReviews";
import { useChartData } from "./hooks/useChartData";

import BookListItem from "../../components/ui/list/BookListItem";
import NoBook from '../../components/ui/NoBook';
import DateSelector from "./components/DateSelector";
import ReadingStatsChart from "./components/ReadingStatsChart";
import BookCountByDate from "./components/BookCountByDate";


function Statistic() {
  const { readReviews } = useReadReviews();
  const {
    selectedYear,
    setSelectedYear,
    selectedMonth,
    setSelectedMonth,
    uniqueStartYears,
    matchingYearReviews,
    matchingYearMonthReviews
   } = useDateFilteredReviews(readReviews);
   
  if (readReviews.length === 0) {
    return <NoBook />;
  }
  const dataForChart = useChartData(selectedYear, readReviews);
  const handleChangeYear = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(e.target.value);
  };
  const handleChangeMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const navigate = useNavigate();
  const setBookData = useSetRecoilState(bookState);
  const handleBookClick = ({ thumbnail, title, authors, publisher, id }: Review) => {
    setBookData({ thumbnail, title, authors, publisher, id });
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
          arr={MONTH}
          dateUnit="월"
        />
        <BookCountByDate num={matchingYearMonthReviews.length} />
      </div>
      {matchingYearMonthReviews.length > 0 ? (
        matchingYearMonthReviews.map((item: Review) => (
          <div key={item.id}>
            <BookListItem
              handleBookClick={() => handleBookClick(item)}
              {...item}
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