import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

export const useThunk = (thunk) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const runAPI = useCallback((arg) => {
    setIsLoading(true);
    dispatch(thunk(arg))
      .unwrap()
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }, [dispatch, thunk]);

  return [runAPI, isLoading, error];
};
