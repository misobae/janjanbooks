interface BookCountByDateProps {
  num: number;
}

function BookCountByDate({ num }: BookCountByDateProps) {
  return (
    <p className="text-sm font-medium ml-2">
      총 <strong className="font-bold">{num}권</strong>
    </p>
  )
}

export default BookCountByDate;