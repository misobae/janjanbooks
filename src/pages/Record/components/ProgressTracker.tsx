import { formatDate } from "../../../utils/dateFormat";
import { Review } from "../../../types/review";

import ProgressLabel from "./ProgressLabel";
import ProgressInput from "./ProgressInput";
import BookInfoBox from "./BookInfoBox";
import ReadingPeriod from "./ReadingPeriod";

interface ProgressTrackerProps extends Review {
  setCat: React.Dispatch<React.SetStateAction<string>>;
  setStartDate: React.Dispatch<React.SetStateAction<string>>;
  setEndDate: React.Dispatch<React.SetStateAction<string>>;
  setReview: React.Dispatch<React.SetStateAction<string>>;
}

function ProgressTracker({ 
  thumbnail, title, authors, publisher, cat, startDate, endDate, review,
  setCat, setStartDate, setEndDate, setReview
}: ProgressTrackerProps) {

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
    <div className="rounded-br-[48px] py-10 bg-black">
      <BookInfoBox
        thumbnail={thumbnail}
        title={title}
        authors={authors}
        publisher={publisher}
      />

      <div className="md:flex md:items-center md:gap-5 w-[90%] max-w-[1200px] m-auto">
        <div className="md:flex-initial md:w-1/2">
          <h3 className="mb-2 text-white">독서 상태</h3>
          <div className="flex justify-between gap-3 mb-8 md:mb-0">
            <ProgressInput value="read" selectedOption={cat} handleRadioChange={handleRadioChange} />
            <ProgressInput value="reading" selectedOption={cat} handleRadioChange={handleRadioChange} />
            <ProgressInput value="wantToRead" selectedOption={cat} handleRadioChange={handleRadioChange} />

            <ProgressLabel htmlFor="read" selectedOption={cat} view={false} />
            <ProgressLabel htmlFor="reading" selectedOption={cat} view={false} />
            <ProgressLabel htmlFor="wantToRead" selectedOption={cat} view={false} />
          </div>
        </div>
        <div className="md:flex-initial md:w-1/2">
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
      </div>
    </div>

    <div className="layout">
      <p className="mb-3">어떤 책인가요?</p>
      <textarea
        onChange={(e) => handleTextAreaChange(e)}
        value={review}
        placeholder="기억하고 싶은 내용이나 느낀 점을 기록해 보세요."
        className="
          w-full h-[220px] p-5
          border border-gray rounded-xl
          text-sm break-keep resize-none">
      </textarea>
    </div>
    </>
  )
}

export default ProgressTracker;