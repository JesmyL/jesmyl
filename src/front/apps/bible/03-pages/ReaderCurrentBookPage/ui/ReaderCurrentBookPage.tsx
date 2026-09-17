import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BibleTranslateModulesControl } from '$bible/entities/translate';
import { useBibleSimpleCheckedSingleAddress } from '$bible/shared/hooks';
import { useBibleShowTranslatesValue } from '$bible/shared/hooks/translates';
import { bibleTbcvDecode, makeBibleTbcvPrefix } from '$bible/shared/lib/tbcv.parser';
import { bibleTBCVTranslatesIDB } from '$bible/shared/state/bibleIDB';
import { BibleReaderBookText } from '$bible/widgets/reader';
import { useLiveQuery } from 'dexie-react-hooks';
import { useMemo } from 'react';
import { BibleReaderCurrentBookAddressSelector } from './AddressSelector';

export function BibleReaderCurrentBookPage() {
  const [currentBooki, currentChapteri, currentVersei] = useBibleSimpleCheckedSingleAddress();
  const showTranslates = useBibleShowTranslatesValue();
  const tName = showTranslates[0];
  const bookChapters = useLiveQuery(
    () => bibleTBCVTranslatesIDB.tb.list.where('k').startsWith(makeBibleTbcvPrefix(tName, currentBooki)).toArray(),
    [],
  );

  const chapterList = useMemo(() => {
    const list: string[][] = [];

    bookChapters?.forEach(it => {
      const { chapteri, versei } = bibleTbcvDecode(it.k);

      (list[chapteri] ??= [])[versei] = it.v;
    });

    return list;
  }, [bookChapters]);

  return (
    <PageContainerConfigurer
      className=""
      withoutBackButton
      headTitle={<BibleReaderCurrentBookAddressSelector />}
      head={<BibleTranslateModulesControl isHideEmptyBook />}
      content={
        <BibleReaderBookText
          chapterList={chapterList}
          currentChapteri={currentChapteri}
          currentVersei={currentVersei}
          currentBooki={currentBooki}
        />
      }
    />
  );
}
