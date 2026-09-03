import { makeBibleJoinedAddressText } from '$bible/shared/hooks/texts';
import { BibleBroadcastJoinAddress } from '$bible/shared/model/base';
import { useBibleCurrentLangi } from '$bible/shared/state/atoms';

export function BibleBroadcastArchiveJoinedAddressText({ item }: { item: BibleBroadcastJoinAddress }) {
  const langi = useBibleCurrentLangi();
  return <>{makeBibleJoinedAddressText(langi, item, 'short')}</>;
}
