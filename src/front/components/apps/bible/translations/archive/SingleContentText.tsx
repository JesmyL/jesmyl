import { useBibleSlideText } from '$bible/basis/lib/hooks/useBibleSlideText';
import { BibleTranslationSingleAddress } from '$bible/basis/model/base';

export function BibleTranslationArchiveSingleContentText({ item }: { item: BibleTranslationSingleAddress }) {
  return <span dangerouslySetInnerHTML={{ __html: useBibleSlideText(item, true) }} />;
}
