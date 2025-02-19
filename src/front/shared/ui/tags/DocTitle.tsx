import { memo, useEffect } from 'react';

const initTitle = document.title;
const ret = () => {
  document.title = initTitle;
};

export const DocTitle = memo(function DocTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = `${title} × ${initTitle}`;

    return ret;
  }, [title]);

  return <></>;
});
