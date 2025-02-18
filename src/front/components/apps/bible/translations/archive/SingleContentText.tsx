import { BibleTranslationSingleAddress } from '../../../../../07-basis/model/bible';
import { useBibleSingleSlideText } from '../../hooks/texts';

export default function BibleTranslationArchiveSingleContentText({ item }: { item: BibleTranslationSingleAddress }) {
  return <span dangerouslySetInnerHTML={{ __html: useBibleSingleSlideText(...item, true) }} />;
}
