import { mylib } from '#shared/lib/my-lib';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useGetterJoinedAddressMaxValues, useSetBibleAddressIndexes } from '$bible/basis/lib/hooks/address/address';
import { bibleJoinAddressAtom } from '$bible/basis/lib/store/atoms';
import { BibleTranslationAddress } from '$bible/basis/model/base';
import { JSX, memo } from 'react';
import { BibleTranslationArchiveJoinedAddressText } from './JoinedAddress';
import { BibleTranslationArchiveJoinedContentText } from './JoinedContentText';
import { BibleTranslationArchiveSingleAddressText } from './SingleAddressText';
import { BibleTranslationArchiveSingleContentText } from './SingleContentText';

interface Props {
  title: string;
  list: BibleTranslationAddress[];
  onRemove: () => void;
}

const itemClassName = 'nowrap pointer mb-2';

export const BibleTranslationArchive = memo(function BibleTranslationArchive({
  title,
  list,
  onRemove,
}: Props): JSX.Element {
  const setAddress = useSetBibleAddressIndexes();
  const getJoinAddressMaxes = useGetterJoinedAddressMaxValues();

  return (
    <>
      <div className="archive-title flex gap-2 text-x3 bg-x2 mb-2">
        {title}
        <TheIconButton
          icon="Delete01"
          className="text-xKO"
          confirm={`Очистить раздел ${title}?`}
          onClick={onRemove}
        />
      </div>
      {list.map((item, itemi) => {
        if (mylib.isArr(item))
          return (
            <div
              key={item[0] + ' ' + item[1] + ':' + item[2]}
              id={'archive-itemi-' + itemi}
              className={itemClassName}
              onClick={() => {
                bibleJoinAddressAtom.set(null);
                setAddress(...item);
              }}
            >
              <span className="text-x7">
                <BibleTranslationArchiveSingleAddressText item={item} />
              </span>
              {' - '}
              <BibleTranslationArchiveSingleContentText item={item} />
            </div>
          );

        return (
          <div
            key={itemi}
            id={'archive-itemi-' + itemi}
            className={itemClassName}
            onClick={() => {
              bibleJoinAddressAtom.set(item);
              setAddress(...getJoinAddressMaxes(item));
            }}
          >
            <span className="text-x7">
              <BibleTranslationArchiveJoinedAddressText item={item} />
            </span>
            {' - '}
            <BibleTranslationArchiveJoinedContentText item={item} />
          </div>
        );
      })}
    </>
  );
});
