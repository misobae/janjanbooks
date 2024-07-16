import { Link, useNavigate } from "react-router-dom";
import { useRecoilCallback } from "recoil";

import { bookState } from "../../../recoil/book";
import { Review } from "../../../types/review";

import NoBookCover from "../../../components/ui/NoBookCover";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

interface ReadStateListProps {
  title: string;
  category: Review[];
  path: string;
}

function ReadStateList({ title, category, path }: ReadStateListProps) {
  const navigate = useNavigate();
  const onBoxClicked = useRecoilCallback(({ set }) => async (data: Review) => {
    const { img, title, authors, publisher, id } = data;
    await set(bookState, { thumbnail: img, title, authors, publisher, id });

    navigate(`/record/${id}`);
  }, [navigate]);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        }
      },
    ]
  };

  return (
    <div className="mb-20 min-h-[100px]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">{title}</h2>
        <Link to={`/list/${path}`} className="text-sm">더 보기</Link>
      </div>
      {category.length > 0 ? (
        <Slider {...settings}>
          {category.map((data) => (
            <div
              key={data.id}
              onClick={() => onBoxClicked(data)}
              className="h-full px-1 lg:px-2 cursor-pointer"
            >
              { data.img === "" ? (
                <NoBookCover />
                ) : (
                <img
                  width="120" height="174"
                  className="block w-full aspect-[120/174]"
                  src={data.img} alt={data.title+'북 커버'}
                />
              )}
            </div>
          ))}
        </Slider>
      ) : (
        <p>아직 작성된 기록이 없어요.</p>
      )}
    </div>
  )
}

export default ReadStateList;