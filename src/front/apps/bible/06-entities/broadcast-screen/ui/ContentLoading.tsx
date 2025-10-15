import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { useConnectionState } from '$index/useConnectionState';

export function BibleBroadcastScreenContentLoading() {
  return <>{useConnectionState() ?? <TheIconLoading />}</>;
}
