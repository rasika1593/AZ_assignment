import { useState } from 'react';

interface LoaderHook {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const useLoader = (): LoaderHook => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return { isLoading, setIsLoading };
};

export default useLoader;