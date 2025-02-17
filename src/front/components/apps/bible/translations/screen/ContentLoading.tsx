import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import useConnectionState from '../../../../index/useConnectionState';

export default function BibleTranslationScreenContentLoading() {
  return <>{useConnectionState() ?? <TheIconLoading />}</>;
}
