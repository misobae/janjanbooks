interface BtnProps {
  text: string
}
function Btn({ text }: BtnProps) {
  return (
    <button className="
      py-2 px-10
      rounded-2xl
    bg-blue-600
     text-white font-semibold
    ">
      {text}
    </button>
  )
};

export default Btn;