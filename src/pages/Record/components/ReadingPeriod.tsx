type HandleDateChangeType = (
  event: React.ChangeEvent<HTMLInputElement>,
  setDate: React.Dispatch<React.SetStateAction<Date>>
) => void;

interface ReadingPeriodProps {
  startDate: Date;
  endDate: Date;
  readonly: boolean;
  handleDateChange?: HandleDateChangeType | undefined;
  setStartDate?: React.Dispatch<React.SetStateAction<Date>>;
  setEndDate?: React.Dispatch<React.SetStateAction<Date>>;
};

const today = new Date();
const dateToString = (date: Date) => date.toISOString().split('T')[0];

function ReadingPeriod({ startDate, endDate, readonly, handleDateChange, setStartDate, setEndDate}: ReadingPeriodProps) {

  return (
    <>
      <h3 className="mb-2 text-white">독서 기간</h3>
      <div className="
        flex justify-between
        py-2 px-5 mb-2
        bg-white rounded-xl"
      >
        <label htmlFor="startDate">시작일</label>
        <input
          type="date"
          id="startDate"
          max={dateToString(today)}
          min="1960-01-01"
          value={dateToString(startDate)}
          readOnly={readonly}
          onChange={readonly ? undefined : (e) => handleDateChange?.(e, setStartDate!)} 
        />
      </div>
      <div className="
        flex justify-between
        py-2 px-5
        bg-white rounded-xl"
      >
        <label htmlFor="endDate">종료일</label>
        <input
          type="date"
          id="endDate"
          max={dateToString(today)}
          min={dateToString(startDate)}
          value={dateToString(endDate)}
          readOnly={readonly}
          onChange={readonly ? undefined : (e) => handleDateChange?.(e, setEndDate!)} 
        />
      </div>
    </>
  )
}

export default ReadingPeriod;