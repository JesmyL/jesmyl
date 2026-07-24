import { useBibleAddressBooki, useBibleAddressChapteri, useBibleAddressVersei } from '$bible/shared/hooks';
import { makeBibleJoinedAddressText } from '$bible/shared/hooks/texts';
import { BibleBroadcastSingleAddress } from '$bible/shared/model/base';
import { useBibleCurrentLangi } from '$bible/shared/state/atoms';

export const BibleAddressSingle = (props: { address?: BibleBroadcastSingleAddress }) => {
  if (props.address === undefined) return <Current />;

  return <Propped address={props.address} />;
};

const Propped = (props: { address: BibleBroadcastSingleAddress }) => {
  const langi = useBibleCurrentLangi();
  return <>{makeBibleJoinedAddressText(langi, props.address)}</>;
};

const Current = () => {
  const langi = useBibleCurrentLangi();
  return (
    <>
      {makeBibleJoinedAddressText(langi, [useBibleAddressBooki(), useBibleAddressChapteri(), useBibleAddressVersei()])}
    </>
  );
};
