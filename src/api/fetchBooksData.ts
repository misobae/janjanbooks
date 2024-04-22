import instance from "./instance";

export const fetchData = async (searchWord: string, pageParam: number) => {
  try {
    const { data } = await instance.get('/v3/search/book', {
      params: {
        query: searchWord,
        page: pageParam,
        target: "title, person"
      }
    });

    return data;

  } catch (error) {
      console.log(error);
  }
};