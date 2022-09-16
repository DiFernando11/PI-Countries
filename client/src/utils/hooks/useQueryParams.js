import { useEffect, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";

export function useQueryParams() {
  const [queries, setQueries] = useState({});
  const { search } = useLocation();
  const onDecodeQuery = useCallback((params) => {
    const replaceFirstCharacter = params.replace("?", "");
    const splitString = replaceFirstCharacter.split("&");
    const formattedQueries = {};
    splitString.forEach((query) => {
      const [key, value] = query.split("=");
      Object.assign(formattedQueries, {
        [key]: value,
      });
    });
    setQueries(formattedQueries)
  });
  useEffect(() => {
    if (search.trim()) {
      onDecodeQuery(search);
    }
  }, [search]);
  return queries;
}
