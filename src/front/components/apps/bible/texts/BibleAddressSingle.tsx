import { useBibleAddressBooki } from '$bible/hooks/address/books';
import { useBibleAddressChapteri } from '$bible/hooks/address/chapters';
import { useBibleAddressVersei } from '$bible/hooks/address/verses';
import { useBibleSimpleAddressText } from '$bible/hooks/texts';
import { BibleTranslationSingleAddress } from '$bible/model';

export const BibleAddressSingle = (props: { address?: BibleTranslationSingleAddress }) => {
  if (props.address === undefined) return <Current />;

  return <Propped address={props.address} />;
};

const Propped = (props: { address: BibleTranslationSingleAddress }) => {
  return <>{useBibleSimpleAddressText(...props.address)}</>;
};

const Current = () => {
  return <>{useBibleSimpleAddressText(useBibleAddressBooki(), useBibleAddressChapteri(), useBibleAddressVersei())}</>;
};
