import { TheIconLoading } from 'front/08-shared/ui/the-icon/IconLoading';
import useConnectionState from '../../../../../07-basis/lib/hooks/+app/useConnectionState';

export default function BibleTranslationScreenContentLoading() {
  return <>{useConnectionState() ?? <TheIconLoading />}</>;
}
