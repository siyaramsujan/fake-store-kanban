import { useEffect, useState, useCallback } from "react";

interface Props<T> {
  fetchFunction: () => Promise<T>; 
  dependency?: any[];  
}

interface ReturnType<T> {
  data: T | null;
  loading: boolean;
  refetch: () => void;
}

export function useFetchService<T>({ fetchFunction, dependency = [] }: Props<T>): ReturnType<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [fetchFunction]);

  useEffect(() => {
    fetchData();
  }, dependency); 

  return { data, loading, refetch: fetchData };
}

