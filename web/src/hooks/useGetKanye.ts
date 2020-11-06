import { useEffect, useState } from "react";

const useGetKanye = () => {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.kanye.rest");
        const json = await response.json();
        setData(json.quote);
      } catch (err) {
        setError(true);
      }
    };
    fetchData();
  }, []);
  return { data, error };
};

export default useGetKanye;
