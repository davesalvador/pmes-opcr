import axios from "axios";
import { useEffect, useState } from "react";
import { getUsername } from "../helper/helper.js";
const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:8080",
});

/**custom hook */
export default function useFetch(query) {
  const [getData, setData] = useState({
    isLoading: false,
    apiData: undefined,
    status: null,
    serverError: null,
  });
  useEffect(() => {
    // if (!query) return;

    const fetchData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));
        const { username } = !query ? await getUsername() : "";

        const { data, status } = !query
          ? await api.get(`/api/user/${username}`)
          : await api.get(`/api/${query}`);

        if (status === 201) {
          setData((prev) => ({ ...prev, isLoading: false }));
          setData((prev) => ({ ...prev, apiData: data, status: status }));
        }
      } catch (error) {
        setData((prev) => ({ ...prev, isLoading: false, serverError: error }));
      }
    };
    fetchData();
  }, [query]);
  return [getData, setData];
}
