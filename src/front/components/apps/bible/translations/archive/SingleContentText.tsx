import { useBibleSingleSlideText } from '@bible/hooks/texts';
import { BibleTranslationSingleAddress } from '@bible/model';

export function BibleTranslationArchiveSingleContentText({ item }: { item: BibleTranslationSingleAddress }) {
  return <span dangerouslySetInnerHTML={{ __html: useBibleSingleSlideText(...item, true) }} />;
}
