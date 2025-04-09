import { useEffect } from 'react';

const initTitle = document.title;
const ret = () => {
  document.title = initTitle;
};

export const DocTitle = ({ title }: { title: string | nil }) => {
  useEffect(() => {
    if (title == null) return ret();
    document.title = `${title} × ${initTitle}`;

    return ret;
  }, [title]);

  return <></>;
};
