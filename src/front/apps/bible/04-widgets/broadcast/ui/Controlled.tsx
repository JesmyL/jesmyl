import { translateBase } from '#basis/locale';
import { takeBaseLanguageAtom } from '#basis/state/locale';
import { currentBroadcastConfigiAtom } from '#features/broadcast/atoms';
import { isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import {
  remoteBibleSearchMatchesAtom,
  remoteBibleSearchTermAtom,
  remoteBibleVersesAtom,
} from '#features/broadcast/remote/controller';
import { useBibleRemoteBroadcast } from '#features/broadcast/remote/hooks';
import { remoteBibleSearchMinTermLength } from '#features/broadcast/remote/model';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BroadcastResizableGrid } from '#widgets/broadcast';
import { BroadcastGridTabConfig } from '#widgets/broadcast/model/TabConfig';
import { bibleBroadcastTabConfigDict } from '$bible/shared/const';
import { takeBibleLangBooks } from '$bible/shared/const/bibleTitles';
import { bibleTranslateFilter } from '$bible/shared/const/consts';
import { takeBibleSimpleCheckedSingleAddress, useBibleSimpleCheckedSingleAddress } from '$bible/shared/hooks';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { bibleBroadcastSyncSlide, biblePrintShowSlideAddressCode } from '$bible/shared/hooks/slide-sync';
import { takeBibleTranslateBookSizesAtom } from '$bible/shared/lib/takeBibleTranslateBookSizesAtom';
import { bibleTbcvEncode, makeBibleTbcvPrefix } from '$bible/shared/lib/tbcv.parser';
import { useBibleBroadcastKeyListener } from '$bible/shared/lib/useBibleBroadcastKeyListener';
import { useBibleCurrentLangi } from '$bible/shared/lib/useBibleCurrentLangi';
import { BibleBroadcastKeyListenScope, BibleBroadcastTabId } from '$bible/shared/model/broadcast';
import { BibleBooki, BibleBroadcastJoinAddress, BibleChapteri } from '$bible/shared/model/base';
import { bibleBroadcastSearchListen } from '$bible/entities/broadcast-search';
import {
  bibleBroadcastGridActiveTabiAtom,
  bibleBroadcastGridSizesAtom,
  bibleBroadcastGridTabsAtom,
} from '$bible/shared/state';
import {
  bibleBookiAtom,
  bibleChapteriAtom,
  bibleJoinAddressAtom,
  bibleMyTranslatesAtom,
  bibleShowTranslatesAtom,
  bibleVerseiAtom,
} from '$bible/shared/state/atoms';
import { bibleTBCVTranslatesIDB } from '$bible/shared/state/bibleIDB';
import { Link } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { ReactNode, useEffect, useMemo, useRef } from 'react';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { arrayByLength, objectLength } from 'shared/utils/object.utils';

interface Props {
  head: ReactNode;
  headTitle: ReactNode;
}

const remoteBibleSearchMaxMatches = 50;



const makeJoinAddressWithChapter = (
  joinAddress: BibleBroadcastJoinAddress | nil,
  booki: BibleBooki,
  chapteri: BibleChapteri,
  verseis: number[],
): BibleBroadcastJoinAddress | nil => {
  const nextJoinAddress = { ...joinAddress };
  const bookChapters = { ...nextJoinAddress[booki] };

  if (verseis.length) bookChapters[chapteri] = verseis;
  else delete bookChapters[chapteri];

  if (objectLength(bookChapters)) nextJoinAddress[booki] = bookChapters;
  else delete nextJoinAddress[booki];

  return objectLength(nextJoinAddress) ? nextJoinAddress : null;
};

const config: BroadcastGridTabConfig<BibleBroadcastTabId> = {
  gridSizesAtom: bibleBroadcastGridSizesAtom,
  tabNetAtom: bibleBroadcastGridTabsAtom,
  activeTabiAtom: bibleBroadcastGridActiveTabiAtom,
  tabs: bibleBroadcastTabConfigDict,
  forceShownTabIdSet: new Set<BibleBroadcastTabId>([BibleBroadcastTabId.History, BibleBroadcastTabId.Plan]),
};

export const BibleBroadcastControlled = ({ head, headTitle }: Props) => {
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);

  useBibleBroadcastKeyListener(window, currentConfigi);

  const showTranslates = useBibleShowTranslatesValue();
  const myTranslates = useAtomValue(bibleMyTranslatesAtom);
  const tName = showTranslates[0];
  const bookSizes = useAtomValue(takeBibleTranslateBookSizesAtom(tName));
  const [booki, chapteri, versei] = useBibleSimpleCheckedSingleAddress();
  const joinAddress = useAtomValue(bibleJoinAddressAtom);
  const langi = useBibleCurrentLangi();
  const remoteBookSizes = bookSizes[booki];
  const remoteBooks = useMemo(
    () =>
      takeBibleLangBooks(langi).map((book, booki) => ({
        short: book.short,
        full: book.full,
        color: book.color,
        disabled: bibleTranslateFilter[tName](booki),
      })),
    [langi, tName],
  );
  const currentVerses = useLiveQuery(
    () =>
      bibleTBCVTranslatesIDB.tb.list
        .where('k')
        .startsWith(makeBibleTbcvPrefix(tName, booki, chapteri))
        .toArray(),
    [tName, booki, chapteri],
  );
  const remoteBibleVerses = useAtomValue(remoteBibleVersesAtom);
  const remoteVerses = useMemo(() => {
    if (currentVerses == null) {
      return remoteBibleVerses != null &&
        remoteBibleVerses.booki === booki &&
        remoteBibleVerses.chapteri === chapteri &&
        remoteBibleVerses.translationName === tName
        ? remoteBibleVerses.verses
        : [];
    }

    return currentVerses.map(verse => verse.v);
  }, [currentVerses, remoteBibleVerses, booki, chapteri, tName]);

  useEffect(() => {
    if (currentVerses == null) return;

    remoteBibleVersesAtom.set({ booki, chapteri, translationName: tName, verses: currentVerses.map(verse => verse.v) });
  }, [currentVerses, booki, chapteri, tName]);

  const remoteSearchTerm = useAtomValue(remoteBibleSearchTermAtom);
  const remoteSearchMatches = useAtomValue(remoteBibleSearchMatchesAtom);
  const remoteSearchTermRef = useRef('');
  const previousAppliedSearchTermRef = useRef('');

  useEffect(() => {
    const appliedSearchTerm = remoteSearchTerm.trim();

    if (appliedSearchTerm === '' && previousAppliedSearchTermRef.current !== '') biblePrintShowSlideAddressCode();

    previousAppliedSearchTermRef.current = appliedSearchTerm;
  }, [remoteSearchTerm]);

  useEffect(() => {
    const term = remoteSearchTerm.trim();
    if (term.length < remoteBibleSearchMinTermLength) {
      remoteSearchTermRef.current = '';
      remoteBibleSearchMatchesAtom.set([]);
      return;
    }

    remoteSearchTermRef.current = term;

    bibleBroadcastSearchListen(
      {
        term,
        booki,
        chapteri,
        listenScope: BibleBroadcastKeyListenScope.SearchInText,
        showTranslates,
        maxItems: remoteBibleSearchMaxMatches - 1,
      },
      response => {
        if (response.term !== remoteSearchTermRef.current) return;

        const list = response.list;
        const keys = list.map(([booki, chapteri, versei]) => bibleTbcvEncode(tName, booki, chapteri, versei));

        void bibleTBCVTranslatesIDB.tb.list.bulkGet(keys).then(rows => {
          if (remoteSearchTermRef.current !== term) return;

          remoteBibleSearchMatchesAtom.set(
            list.map(([booki, chapteri, versei], matchi) => ({
              booki,
              chapteri,
              versei,
              bookTitle: remoteBooks[booki]?.short ?? '',
              html: rows[matchi]?.v ?? '',
            })),
          );
        });
      },
    );
  }, [booki, chapteri, remoteBooks, remoteSearchTerm, showTranslates, tName]);
  const baseDict = useAtomValue(takeBaseLanguageAtom());
  const remoteTranslations = useMemo(
    () =>
      myTranslates.map(name => ({
        name,
        title: baseDict[BaseLocaleKey.BibleTranslate]?.[name] ?? name,
      })),
    [baseDict, myTranslates],
  );

  useBibleRemoteBroadcast(
    {
      booki,
      chapteri,
      versei,
      bookTitle: remoteBooks[booki]?.short ?? '',
      joinAddress: joinAddress[0],
      translationName: tName,
      translations: remoteTranslations,
      books: remoteBooks,
      verses: remoteVerses,
      searchMatches: remoteSearchMatches,
      searchTerm: remoteSearchTerm,
      chapterCount: remoteBookSizes?.length ?? 0,
    },
    {
      applyAddress: patch => {
        const nextBooki = Math.max(0, Math.min(patch.booki ?? booki, remoteBooks.length - 1));
        const isBookChanged = nextBooki !== booki;
        const nextChapteri = patch.chapteri ?? (isBookChanged ? 0 : chapteri);
        const isChapterChanged = nextChapteri !== chapteri;
        const nextVersei = patch.versei ?? (isBookChanged || isChapterChanged ? 0 : versei);
        const [b, c, v] = takeBibleSimpleCheckedSingleAddress(null, nextBooki, nextChapteri, nextVersei);

        bibleBookiAtom.set(b);
        bibleChapteriAtom.set(c);
        bibleVerseiAtom.set(v);

        const verseCount = bookSizes[b]?.[c] ?? 0;

        if (patch.joinAddress != null) {
          const verseis = patch.verseis ?? [];

          if (verseis.length) bibleVerseiAtom.set(verseis[verseis.length - 1]);

          bibleJoinAddressAtom.set([
            makeJoinAddressWithChapter(bibleJoinAddressAtom.get()[0], b, c, patch.joinAddress[b]?.[c] ?? []),
          ]);
        } else if (patch.verseis != null) {
          const verseis = verseCount ? patch.verseis.filter(versei => versei < verseCount) : patch.verseis;

          if (verseis.length) bibleVerseiAtom.set(verseis[verseis.length - 1]);

          bibleJoinAddressAtom.set([makeJoinAddressWithChapter(bibleJoinAddressAtom.get()[0], b, c, verseis)]);
        } else if (patch.finishVersei != null) {
          if (verseCount > 0) {
            const lastVersei = Math.min(patch.finishVersei, verseCount - 1);

            if (lastVersei > v) {
              bibleVerseiAtom.set(lastVersei);
              bibleJoinAddressAtom.set([
                makeJoinAddressWithChapter(
                  bibleJoinAddressAtom.get()[0],
                  b,
                  c,
                  arrayByLength(lastVersei - v + 1, i => v + i),
                ),
              ]);
            } else bibleJoinAddressAtom.set([makeJoinAddressWithChapter(bibleJoinAddressAtom.get()[0], b, c, [])]);
          }
        } else if (patch.versei != null) {
          bibleJoinAddressAtom.reset();
        }

        if (patch.versei != null) {
          isShowBroadcastTextAtom.set(true);
          biblePrintShowSlideAddressCode();
          bibleBroadcastSyncSlide();
        }
      },
      applyTranslation: requestTName => {
        const nextTName = bibleMyTranslatesAtom.get().find(name => name === requestTName);
        if (nextTName == null) return;

        bibleShowTranslatesAtom.set([nextTName]);

        if (!bibleTranslateFilter[nextTName](bibleBookiAtom.get())) return;

        const firstBooki = takeBibleLangBooks(langi).findIndex((_book, booki) => !bibleTranslateFilter[nextTName](booki));
        if (firstBooki < 0) return;

        const [b, c, v] = takeBibleSimpleCheckedSingleAddress(nextTName, firstBooki, 0, 0);

        bibleBookiAtom.set(b);
        bibleChapteriAtom.set(c);
        bibleVerseiAtom.set(v);
      },
      search: term => remoteBibleSearchTermAtom.set(term),
    },
  );

  useEffect(() => {
    biblePrintShowSlideAddressCode();
  }, []);

  return (
    <PageContainerConfigurer
      className=""
      headTitle={headTitle ?? translateBase(BaseLocaleKey.Bible)}
      head={head}
      backButtonRender={(linkRef, backButtonNode) => (
        <Link
          to="."
          ref={linkRef}
          search={prev => ({ ...prev, tran: undefined })}
        >
          {backButtonNode}
        </Link>
      )}
      content={
        <div
          className="w-full h-full"
          st-hide-footer-menu=""
        >
          <BroadcastResizableGrid config={config} />
        </div>
      }
    />
  );
};
