import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import { searchedWordState } from "../state/atoms";
import { IBooksData } from "../utils/types";
import { fetchData } from "../api/fetchBooksData";

import Header from "../components/layout/Header";
import BookList from "../components/BookList";
import BtnBack from "../components/common/BtnBack";
import SearchFrom from "../components/SearchForm";

function Result() {
  const searchedWord = useRecoilValue(searchedWordState);
  const { data, isLoading } = useQuery({
    queryKey: ['searchData', searchedWord],
    queryFn: () => fetchData(searchedWord),
    enabled: !!searchedWord,
  });

  return (
    <>
      <Header text="기록할 책이 있으세요?" btnBack={<BtnBack />} searchForm={<SearchFrom />} />
      <div className="layout">
        {data && data.length > 0 ? (
          <p className="text-sm">
            <strong className="font-bold">"{searchedWord}"</strong>의 검색 결과입니다.
          </p>
        ) : null }
        {isLoading ? (
          <p>로딩중...</p>
        ) : (
          <>
            {data && data.length > 0 ? (
              data.map((item: IBooksData) => (
                <div key={item.isbn}>
                  <BookList
                    isbn={item.isbn}
                    thumbnail={item.thumbnail}
                    title={item.title}
                    authors={item.authors}
                    publisher={item.publisher}
                  />
                </div>
              ))
            ) : searchedWord && (
              <p className="text-sm">검색 결과가 없습니다.</p>
            )}
          </>
        )}
      </div>
    </>
  )
};

export default Result;