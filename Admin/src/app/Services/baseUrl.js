function BaseUrl() {
  return process.env.REACT_APP_NEXT_PUBLIC_REST_API_ENDPOINT || "http://localhost:3001";
  
}

export default BaseUrl