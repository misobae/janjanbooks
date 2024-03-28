import axios from "axios";

function App() {
    const fetchdata = async () => {
      const { data } = await axios.get('/ttb/api/ItemSearch.aspx', {
        params: {
            ttbkey: process.env.ALADIN_API_KEY,
            Query: 'aladin',
            output: 'js'
        }
      });
      console.log(data);
    }
    fetchdata();

  return null;
};

export default App;