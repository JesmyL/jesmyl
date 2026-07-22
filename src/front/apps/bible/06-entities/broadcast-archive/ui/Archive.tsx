import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { bibleAddressIndexesUpdate, takeJoinedAddressMaxValues } from '$bible/shared/hooks';
import { BibleBroadcastAddress } from '$bible/shared/model/base';
import { bibleJoinAddressAtom } from '$bible/shared/state/atoms';
import { JSX, memo } from 'react';
import { checkIsArray } from 'shared/utils/checkIs';
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
        if (checkIsArray(item))
          return (
            <div
              key={item[0] + ' ' + item[1] + ':' + item[2]}
              id={'archive-itemi-' + itemi}
              className={itemClassName}
              onClick={() => {
                bibleJoinAddressAtom.set(null);
                bibleAddressIndexesUpdate(...item);
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
              bibleAddressIndexesUpdate(...takeJoinedAddressMaxValues(item));
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
