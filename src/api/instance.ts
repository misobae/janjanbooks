import axios from "axios";

const instance = axios.create({
  baseURL: "https://dapi.kakao.com",
  headers: {
    Authorization: `KakaoAK ${process.env.KAKAO_API_KEY}`,
  }
});

export default instance;