import { makeBibleJoinedAddressText } from '$bible/shared/hooks/texts';
import { BibleBroadcastJoinAddress } from '$bible/shared/model/base';

export function BibleBroadcastArchiveJoinedAddressText({ item }: { item: BibleBroadcastJoinAddress }) {
  return <>{makeBibleJoinedAddressText(item, 'short')}</>;
}
