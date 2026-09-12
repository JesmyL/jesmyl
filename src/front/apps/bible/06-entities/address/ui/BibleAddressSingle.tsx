import { useBibleSimpleCheckedSingleAddress } from '$bible/shared/hooks';
import { makeBibleJoinedAddressText } from '$bible/shared/hooks/texts';
import { useBibleCurrentLangi } from '$bible/shared/lib/useBibleCurrentLangi';
import { BibleBroadcastSingleAddress } from '$bible/shared/model/base';
import { Langi } from 'shared/api';

export const BibleAddressSingle = (props: { address?: BibleBroadcastSingleAddress }) => {
  const langi = useBibleCurrentLangi();

  if (props.address) return makeBibleJoinedAddressText(langi, props.address);

  return <Current langi={langi} />;
};

const Current = ({ langi }: { langi: Langi }) => {
  return <>{makeBibleJoinedAddressText(langi, useBibleSimpleCheckedSingleAddress())}</>;
};
