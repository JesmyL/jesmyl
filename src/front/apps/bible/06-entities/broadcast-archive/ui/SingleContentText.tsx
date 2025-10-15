import { useBibleSlideText } from '$bible/shared/hooks/useBibleSlideText';
import { BibleTranslationSingleAddress } from '$bible/shared/model/base';

export function BibleBroadcastArchiveSingleContentText({ item }: { item: BibleTranslationSingleAddress }) {
  return <span dangerouslySetInnerHTML={{ __html: useBibleSlideText(item, true) }} />;
}
