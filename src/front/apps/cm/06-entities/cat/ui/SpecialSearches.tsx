import { MyLib } from '#shared/lib/my-lib';
import { useEffect } from 'react';
import { ICmCatSpecialSearches, useCmCatSpecialSearches } from '../lib/useCatSpecialSearches';

interface Props {
  term: string;
  setTerm: (term: string) => void;
  setMapper: React.Dispatch<React.SetStateAction<ICmCatSpecialSearches['map'] | null>>;
}

export const CmCatSpecialSearches = ({ setTerm, setMapper, term }: Props) => {
  const catSpecialSearches = useCmCatSpecialSearches();

  useEffect(() => {
    const mapper = MyLib.entries(catSpecialSearches).find(([key]) => term.startsWith(key))?.[1].map;
    if (mapper == null) return;
    setMapper(() => mapper);
  }, [catSpecialSearches, setMapper, term]);

  return (
    <div className="m-2 bg-x2 p-2">
      {MyLib.entries(catSpecialSearches).map(([key, { map, title, isRerenderOnInput }]) => {
        if (term.length > 1 && !term.startsWith(key)) return null;

        return (
          <label
            key={key}
            className="my-2 pointer block"
            htmlFor="debounced-input"
            onClick={() => {
              setTerm(key);
              setMapper(() => map);

              if (isRerenderOnInput)
                setTimeout(() => {
                  setTerm(key + ' ');
                  setTimeout(setTerm, 0, key);
                }, 100);
            }}
          >
            {title}
          </label>
        );
      })}
    </div>
  );
};
