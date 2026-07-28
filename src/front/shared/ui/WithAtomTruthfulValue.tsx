import { TrustChildrenCheckType } from '#shared/model/TrustChildrenCheckType';
import { Atom, useAtomValue } from 'atomaric';
import { checkIsFunction } from 'shared/utils/checkIs';

export const WithAtomTruthfulValue = <Value, TrustValue extends Value = Exclude<Value, nil | '' | false | 0>>({
  atom,
  children,
  checkIsOpen,
}: TrustChildrenCheckType<Value, TrustValue> & { atom: Atom<Value> }) => {
  const value = useAtomValue(atom);
  const isOpen = checkIsOpen === undefined ? !!value : checkIsOpen(value);

  return isOpen && (checkIsFunction(children) ? children(value as never) : children);
};
