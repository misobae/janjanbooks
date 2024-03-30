import instance from "./instance";

export const fetchData = async (searchWord: string) => {
  try {
    const { data } = await instance.get('/v3/search/book', {
      params: {
        query: searchWord,
      }
    });

    return data.documents;

  } catch (error) {
      console.log(error);
  }
};