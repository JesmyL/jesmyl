export const lazyInit = <Value>(init: () => Value) => {
  let ret = () => {
    const value = init();
    ret = () => value;
    return value;
  };

  return () => ret();
};
