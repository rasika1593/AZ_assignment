import { useState } from 'react';

interface ErrorHook {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

const useError = (): ErrorHook => {
  const [error, setError] = useState<string>("");

  return { error, setError };
};

export default useError;
