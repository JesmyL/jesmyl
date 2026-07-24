import { makeBibleJoinedAddressText } from '$bible/shared/hooks/texts';
import { BibleBroadcastSingleAddress } from '$bible/shared/model/base';
import { useBibleCurrentLangi } from '$bible/shared/state/atoms';

export function BibleBroadcastArchiveSingleAddressText({ item }: { item: BibleBroadcastSingleAddress }) {
  const langi = useBibleCurrentLangi();
  return <>{makeBibleJoinedAddressText(langi, item, 'short')}</>;
}
