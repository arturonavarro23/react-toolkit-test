import { useLocation } from 'react-router-dom';
import queryString from 'query-string';

export default () => {
  const location = useLocation();
  return queryString.parse(location.search, { parseNumbers: true });
};
