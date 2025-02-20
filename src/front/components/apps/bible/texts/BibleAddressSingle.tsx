import { useBibleSimpleAddressText } from '@bible/shared/translations/hooks/address';
import { useBibleCurrentBooki } from '@bible/shared/translations/hooks/books';
import { useBibleCurrentChapteri } from '@bible/shared/translations/hooks/chapters';
import { useBibleCurrentVersei } from '@bible/shared/translations/hooks/verses';
import { BibleTranslationSingleAddress } from '../model';

export const BibleAddressSingle = (props: { address?: BibleTranslationSingleAddress }) => {
  if (props.address === undefined) return <Current />;

  return <Propped address={props.address} />;
};

const Propped = (props: { address: BibleTranslationSingleAddress }) => {
  return <>{useBibleSimpleAddressText(...props.address)}</>;
};

const Current = () => {
  return <>{useBibleSimpleAddressText(useBibleCurrentBooki(), useBibleCurrentChapteri(), useBibleCurrentVersei())}</>;
};
