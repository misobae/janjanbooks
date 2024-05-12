interface DateSelectorProps {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  arr: string[];
  dateUnit: string;
}

function DateSelector({ handleChange, value, arr, dateUnit }: DateSelectorProps) {
  return (
    <div className="grid">
      <select
        onChange={handleChange}
        value={value}
        className="appearance-none row-start-1 col-start-1 border border-gray-600 pl-4 pr-7 py-1 rounded-xl font-semibold"
      >
        {arr.map((item, index) => (
          <option
            key={`item-${index}`}
            value={item}
          >
            {item.startsWith('0') ? item.substring(1) : item}{dateUnit}
          </option>
        ))}
      </select>
      <svg className="pointer-events-none z-10 right-2 relative col-start-1 row-start-1 h-4 w-4 self-center justify-self-end forced-colors:hidden" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path>
      </svg>
    </div>
  )
}

export default DateSelector;