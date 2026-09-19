import { translateBase } from '#basis/locale';
import { bibleBroadcastSearchAreaConfigDict } from '$bible/shared/const';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { useAtomValue } from 'atomaric';
import { extractNumber } from 'shared/utils';
import { mapObjectEntries } from 'shared/utils/object.utils';
import { twJoin } from 'tailwind-merge';
import { BibleBroadcastSearchPanelAddressInput } from './AddressInput';
import { BibleBroadcastSearchPanelSearchTextInput } from './SearchTextInput';

interface Props {
  inputRef: React.RefObject<(HTMLInputElement & HTMLTextAreaElement) | null>;
}

export function BibleBroadcastSearchInputPanel({ inputRef }: Props) {
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);

  return (
    <div className="flex gap-2 w-full">
      <span className="nowrap">
        {listenScope === BibleBroadcastKeyListenScope.SearchInText
          ? translateBase(it => it.bible.searchInText)
          : listenScope === BibleBroadcastKeyListenScope.SearchInChapter
            ? translateBase(it => it.bible.searchInChapter)
            : translateBase(it => it.bible.searchByLink)}
        :
      </span>
      {listenScope === BibleBroadcastKeyListenScope.SearchByAddress ? (
        <BibleBroadcastSearchPanelAddressInput inputRef={inputRef} />
      ) : (
        <BibleBroadcastSearchPanelSearchTextInput inputRef={inputRef} />
      )}
      {mapObjectEntries(bibleBroadcastSearchAreaConfigDict, (zoneStr, { title, htmlTitle }) => {
        const zone = extractNumber(zoneStr);

        return (
          <div
            key={zone}
            title={htmlTitle}
            className={twJoin('pointer hover:text-x7', listenScope === zone && 'underline')}
            onClick={() => {
              bibleBroadcastKeyListenScopeAtom.set(zone);
              const select = () => inputRef.current?.select();
              setTimeout(select, 10);
              setTimeout(select, 50);
              setTimeout(select, 100);
            }}
          >
            {title()}
          </div>
        );
      })}
    </div>
  );
}
