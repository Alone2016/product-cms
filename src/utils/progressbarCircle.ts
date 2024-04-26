
import { FC, useState, useEffect } from 'react';

interface IProgressProvider {
  valueStart: number;
  valueEnd: number;
  children: (value?: any) => void;
}

const ProgressProvider: FC<IProgressProvider> = ({ valueStart = 0, valueEnd = 100, children = () => {} }) => {
  const [value, setValue] = useState(valueStart);
  useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};

export default ProgressProvider