import { useBibleAddressBooki } from '$bible/basis/lib/hooks/address/books';
import { useBibleAddressChapteri } from '$bible/basis/lib/hooks/address/chapters';
import { useBibleAddressVersei } from '$bible/basis/lib/hooks/address/verses';
import { makeBibleJoinedAddressText } from '$bible/basis/lib/hooks/texts';
import { BibleTranslationSingleAddress } from '$bible/basis/model/base';

export const BibleAddressSingle = (props: { address?: BibleTranslationSingleAddress }) => {
  if (props.address === undefined) return <Current />;

  return <Propped address={props.address} />;
};

const Propped = (props: { address: BibleTranslationSingleAddress }) => {
  return <>{makeBibleJoinedAddressText(props.address)}</>;
};

const Current = () => {
  return (
    <>{makeBibleJoinedAddressText([useBibleAddressBooki(), useBibleAddressChapteri(), useBibleAddressVersei()])}</>
  );
};
