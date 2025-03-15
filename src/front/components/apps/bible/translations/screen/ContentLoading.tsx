import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { useConnectionState } from '$index/useConnectionState';

export function BibleTranslationScreenContentLoading() {
  return <>{useConnectionState() ?? <TheIconLoading />}</>;
}
