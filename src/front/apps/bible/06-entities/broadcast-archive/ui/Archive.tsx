import { mylib } from '#shared/lib/my-lib';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useGetterJoinedAddressMaxValues, useSetBibleAddressIndexes } from '$bible/shared/hooks';
import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { JSX, memo } from 'react';
import { BibleBroadcastArchiveJoinedAddressText } from './JoinedAddress';
import { BibleBroadcastArchiveJoinedContentText } from './JoinedContentText';
import { BibleBroadcastArchiveSingleAddressText } from './SingleAddressText';
import { BibleBroadcastArchiveSingleContentText } from './SingleContentText';

interface Props {
  title: string;
  list: BibleBroadcastAddress[];
  onRemove: () => void;
}

const itemClassName = 'nowrap pointer mb-2';

export const BibleBroadcastArchive = memo(function BibleBroadcastArchive({
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
                <BibleBroadcastArchiveSingleAddressText item={item} />
              </span>
              {' - '}
              <BibleBroadcastArchiveSingleContentText item={item} />
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
              <BibleBroadcastArchiveJoinedAddressText item={item} />
            </span>
            {' - '}
            <BibleBroadcastArchiveJoinedContentText item={item} />
          </div>
        );
      })}
    </>
  );
});
