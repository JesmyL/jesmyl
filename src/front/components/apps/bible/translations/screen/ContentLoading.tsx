import { TheIconLoading } from '#shared/ui/icon';
import { useConnectionState } from 'front/components/index/useConnectionState';

export default function BibleTranslationScreenContentLoading() {
  return <>{useConnectionState() ?? <TheIconLoading />}</>;
}
