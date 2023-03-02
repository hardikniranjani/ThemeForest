function BaseUrl() {
  // return "http://localhost:3001";
  if (process.env.REACT_APP_NEXT_PUBLIC_REST_API_ENDPOINT) return process.env.REACT_APP_NEXT_PUBLIC_REST_API_ENDPOINT
  return "https://themeforest.onrender.com/";


}

export default BaseUrl


