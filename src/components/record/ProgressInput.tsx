interface ProgressInputProps {
  value: string;
  selectedOption: string;
  handleRadioChange: (option: string) => void;
}

function ProgressInput({ handleRadioChange, selectedOption, value }: ProgressInputProps) {
  const handleChange = () => {
    handleRadioChange(value);
  };

  return (
    <input
      className="hidden"
      type="radio"
      name="readStatus"
      id={value}
      value={value}
      defaultChecked={selectedOption === value}
      onChange={handleChange}
    />
  );
}

export default ProgressInput;