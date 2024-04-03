type HandleDateChangeType = (
  event: React.ChangeEvent<HTMLInputElement>,
  setDate: React.Dispatch<React.SetStateAction<string>>
) => void;

interface ReadingPeriodProps {
  formattedToday?: string;
  startDate: string;
  endDate: string;
  readonly: boolean;
  handleDateChange?: HandleDateChangeType | undefined;
  setStartDate?: React.Dispatch<React.SetStateAction<string>>;
  setEndDate?: React.Dispatch<React.SetStateAction<string>>;
};

function ReadingPeriod({ formattedToday, startDate, endDate, readonly, handleDateChange, setStartDate, setEndDate}: ReadingPeriodProps) {
  
  return (
    <div className="pr-5">
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
          max={formattedToday}
          min="1960-01-01"
          value={startDate}
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
          max={formattedToday}
          min={startDate}
          value={endDate}
          readOnly={readonly}
          onChange={readonly ? undefined : (e) => handleDateChange?.(e, setEndDate!)} 
        />
      </div>
    </div>
  )
}

export default ReadingPeriod;