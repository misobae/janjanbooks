import { useRecoilValue } from "recoil";
import { bookDataState } from "../../state/atoms";
import { formatDate } from "../../utils/dateFormat";

import ProgressLabel from "./ProgressLabel";
import ProgressInput from "./ProgressInput";
import BookInfoBox from "./BookInfoBox";
import ReadingPeriod from "./ReadingPeriod";

interface ProgressTrackerProps {
  cat: string;
  startDate: string;
  endDate: string;
  review: string;
  setCat: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setReview: React.Dispatch<React.SetStateAction<string>>;
}

function ProgressTracker({ 
  cat, startDate, endDate, review,
  setCat, setStartDate, setEndDate, setReview
}: ProgressTrackerProps) {
  const bookData = useRecoilValue(bookDataState);

  const today = new Date();
  const formattedToday = formatDate(today);
  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setDate: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const inputValue = event.target.value;
    const parsedDate = new Date(inputValue);
    const formattedDate = formatDate(parsedDate);
    setDate(formattedDate);
  };

  const handleRadioChange = (option: string) => {
    setCat(option);
  };

  const handleTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReview(event.target.value);
  };

  return (
    <>
    <div className="rounded-br-[48px] py-10 pl-5 bg-black">
      {bookData ? (
        <BookInfoBox
          thumbnail={bookData.thumbnail}
          title={bookData.title}
          authors={bookData.authors}
          publisher={bookData.publisher}
        />
      ) : "Loading"}

      <div className="flex justify-center gap-3 pr-5 mb-8">
        <ProgressInput 
          value="read"
          selectedOption={cat}
          handleRadioChange={handleRadioChange}
        />
        <ProgressInput 
          value="reading"
          selectedOption={cat}
          handleRadioChange={handleRadioChange}
        />
        <ProgressInput 
          value="wantToRead"
          selectedOption={cat}
          handleRadioChange={handleRadioChange}
        />

        <ProgressLabel
          htmlFor="read"
          selectedOption={cat}
          view={false}
        />
        <ProgressLabel
          htmlFor="reading"
          selectedOption={cat}
          view={false}
        />
        <ProgressLabel
          htmlFor="wantToRead"
          selectedOption={cat}
          view={false}
        />
      </div>
      <ReadingPeriod
        formattedToday={formattedToday}
        startDate={startDate}
        endDate={endDate}
        readonly={false}
        handleDateChange={handleDateChange}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </div>

    <div className="p-6">
      <p className="mb-3">어떤 책인가요?</p>
      <textarea
        onChange={(e) => handleTextAreaChange(e)}
        value={review}
        placeholder="기억하고 싶은 내용이나 느낀 점을 기록해 보세요."
        className="
          w-full h-[220px]
          p-5
          border border-gray rounded-xl
          text-sm break-keep resize-none">
      </textarea>
    </div>
    </>
  )
}

export default ProgressTracker;