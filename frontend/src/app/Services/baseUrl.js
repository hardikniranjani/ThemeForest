function BaseUrl() {
  if( process.env.REACT_APP_NEXT_PUBLIC_REST_API_ENDPOINT) return process.env.REACT_APP_NEXT_PUBLIC_REST_API_ENDPOINT
  return "http://localhost:3001";
  
}

export default BaseUrl