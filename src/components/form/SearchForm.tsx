import imgSearch from "../../assets/images/icon_search.svg";

interface SearchFormProps {
  handleFormSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchWord: string;
  placeholder: string;
}

function SearchForm({ handleFormSubmit, handleInputChange, searchWord, placeholder }: SearchFormProps) {
  return (
    <form
      onSubmit={handleFormSubmit}
      className="relative mt-3"
    >
      <input
        type="text"
        placeholder={placeholder}
        value={searchWord}
        onChange={handleInputChange}
        className="w-full pl-10 pr-4 py-2.5 rounded-3xl text-sm"
      />
      <button
        type="submit"
        className="absolute left-3 top-0 bottom-0 my-auto">
        <img className="w-5" src={imgSearch} alt="검색 아이콘" />
      </button>
    </form>
  )
}

export default SearchForm;