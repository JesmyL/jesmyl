import { useBibleAddressBooki, useBibleAddressChapteri, useBibleAddressVersei } from '$bible/shared/hooks';
import { makeBibleJoinedAddressText } from '$bible/shared/hooks/texts';
import { BibleBroadcastSingleAddress } from '$bible/shared/model/base';

export const BibleAddressSingle = (props: { address?: BibleBroadcastSingleAddress }) => {
  if (props.address === undefined) return <Current />;

  return <Propped address={props.address} />;
};

const Propped = (props: { address: BibleBroadcastSingleAddress }) => {
  return <>{makeBibleJoinedAddressText(props.address)}</>;
};

const Current = () => {
  return (
    <>{makeBibleJoinedAddressText([useBibleAddressBooki(), useBibleAddressChapteri(), useBibleAddressVersei()])}</>
  );
};
