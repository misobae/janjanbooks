// <NoBookCover />
// : 책 표지가 없을 경우 사용되는 컴포넌트

import ImgNoBook from "../../assets/images/noBook.svg"

function NoBookCover() {
  return (
    <img src={ImgNoBook} />
  )
}

export default NoBookCover;