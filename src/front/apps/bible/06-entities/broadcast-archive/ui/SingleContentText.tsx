import { useBibleSlideText } from '$bible/shared/hooks/useBibleSlideText';
import { BibleBroadcastSingleAddress } from '$bible/shared/model/base';

export function BibleBroadcastArchiveSingleContentText({ item }: { item: BibleBroadcastSingleAddress }) {
  return <span dangerouslySetInnerHTML={{ __html: useBibleSlideText(item, true) }} />;
}
