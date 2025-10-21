import { useConnectionState } from '#basis/lib/useConnectionState';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';

export function BibleBroadcastScreenContentLoading() {
  return <>{useConnectionState() ?? <TheIconLoading />}</>;
}
