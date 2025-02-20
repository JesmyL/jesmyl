import { BibleTranslationSingleAddress } from '../../model';
import { useBibleSingleSlideText } from '../hooks/texts';

export const BibleTranslationArchiveSingleContentText = ({ item }: { item: BibleTranslationSingleAddress }) => {
  return <span dangerouslySetInnerHTML={{ __html: useBibleSingleSlideText(...item, true) }} />;
};
