import { makeBibleJoinedAddressText } from '$bible/shared/hooks/texts';
import { BibleBroadcastSingleAddress } from '$bible/shared/model/base';

export function BibleBroadcastArchiveSingleAddressText({ item }: { item: BibleBroadcastSingleAddress }) {
  return <>{makeBibleJoinedAddressText(item, 'short')}</>;
}
