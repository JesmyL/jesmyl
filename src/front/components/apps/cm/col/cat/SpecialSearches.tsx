import { MyLib } from 'front/utils';
import { CatSpecialSearches, catSpecialSearches } from './Cat.complect';

interface Props {
  term: string;
  setTerm: (term: string) => void;
  setMapper: React.Dispatch<React.SetStateAction<CatSpecialSearches['map'] | null>>;
}

export const TheCatSpecialSearches = ({ setTerm, setMapper, term }: Props) => {
  return (
    <div className="margin-gap bgcolor--2 padding-gap">
      {MyLib.entries(catSpecialSearches).map(([key, { map, title, isRerenderOnInput }]) => {
        if (term.length > 1 && !term.startsWith(key)) return null;

        return (
          <div
            key={key}
            className="margin-gap-v pointer"
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
          </div>
        );
      })}
    </div>
  );
};
