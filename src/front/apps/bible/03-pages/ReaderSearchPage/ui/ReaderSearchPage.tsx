import { translateBase } from '#basis/locale';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import {
  BibleBroadcastSearchPanelSearchTextInput,
  BibleBroadcastSearchResults,
} from '$bible/entities/broadcast-search';
import { takeBibleLangBooks } from '$bible/ext';
import { useBibleAddressBooki, useBibleAddressChapteri } from '$bible/shared/hooks';
import { BibleBroadcastKeyListenScope } from '$bible/shared/model/broadcast';
import { bibleBroadcastKeyListenScopeAtom } from '$bible/shared/state';
import { useBibleCurrentLangi } from '$bible/shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { useRef } from 'react';

export const BibleReaderSearchPage = () => {
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const listenScope = useAtomValue(bibleBroadcastKeyListenScopeAtom);
  const langi = useBibleCurrentLangi();

  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  return (
    <PageContainerConfigurer
      className=""
      withoutBackButton
      headTitle={translateBase(it => it.search)}
      content={
        <>
          <div className="full-size">
            <IconCheckbox
              checked={listenScope === BibleBroadcastKeyListenScope.SearchInText}
              postfix={
                <span
                  dangerouslySetInnerHTML={{
                    __html: translateBase(it => it.bible.searchByBook, {
                      b: takeBibleLangBooks(langi)[currentBooki].full,
                    }),
                  }}
                />
              }
              onChange={() => {
                bibleBroadcastKeyListenScopeAtom.set(BibleBroadcastKeyListenScope.SearchInText);
              }}
            />
            <IconCheckbox
              checked={listenScope === BibleBroadcastKeyListenScope.SearchInChapter}
              postfix={
                <span
                  dangerouslySetInnerHTML={{
                    __html: translateBase(it => it.bible.searchByChapter, {
                      b: takeBibleLangBooks(langi)[currentBooki].full,
                      c: currentChapteri + 1,
                    }),
                  }}
                />
              }
              onChange={() => {
                bibleBroadcastKeyListenScopeAtom.set(BibleBroadcastKeyListenScope.SearchInChapter);
              }}
            />
            <BibleBroadcastSearchPanelSearchTextInput inputRef={inputRef} />
            <BibleBroadcastSearchResults />
          </div>
        </>
      }
    />
  );
};
