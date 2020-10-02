import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export const useQueryParams = () => {
  const location = useLocation();
  return queryString.parse(location.search, { parseNumbers: true });
};

export default useQueryParams;
