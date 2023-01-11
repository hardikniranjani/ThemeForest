import axios from 'axios';

const ApiBaseUrl = process.env.REACT_APP_NEXT_PUBLIC_REST_API_ENDPOINT || "http://localhost:3001";

export default axios.create({
      baseURL:`${ApiBaseUrl}`,
      headers : {
            "Content-type" : "application/json"
      },
})
