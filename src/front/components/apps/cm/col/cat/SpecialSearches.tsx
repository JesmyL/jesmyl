import { MyLib } from '#shared/lib/my-lib';
import { useEffect } from 'react';
import { CatSpecialSearches, useCatSpecialSearches } from './useCatSpecialSearches';

interface Props {
  term: string;
  setTerm: (term: string) => void;
  setMapper: React.Dispatch<React.SetStateAction<CatSpecialSearches['map'] | null>>;
}

export const TheCatSpecialSearches = ({ setTerm, setMapper, term }: Props) => {
  const catSpecialSearches = useCatSpecialSearches();

  useEffect(() => {
    const mapper = MyLib.entries(catSpecialSearches).find(([key]) => term.startsWith(key))?.[1].map;
    if (mapper == null) return;
    setMapper(() => mapper);
  }, [catSpecialSearches, setMapper, term]);

  return (
    <div className="margin-gap bgcolor--2 padding-gap">
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
