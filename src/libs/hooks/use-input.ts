import React from 'react';

type TValue = string;
export const useInput = (initialValue: TValue) => {
  const [value, setValue] = React.useState<TValue>(initialValue);

  const onChangeText = React.useCallback((value: TValue) => {
    setValue(value);
  }, []);

  const reset = React.useCallback(() => {
    setValue('');
  }, []);

  const bind = {value, onChangeText};

  return {value, reset, bind};
};
