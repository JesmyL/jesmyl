import { atom, Atom, useAtomValue } from 'atomaric';
import { useMemo } from 'react';

export const With3AtomsValue = <Value, Value2, Value3>(props: {
  render: (value: Value, value2: Value2, value3: Value3) => React.ReactNode;
  atoms: [Atom<Value>, Atom<Value2>, Atom<Value3>];
}) => props.render(useAtomValue(props.atoms[0]), useAtomValue(props.atoms[1]), useAtomValue(props.atoms[2]));

export const With3Atoms = <Value, Value2, Value3>(props: {
  render: (atoms: [Atom<Value>, Atom<Value2>, Atom<Value3>]) => React.ReactNode;
  init: [Value, Value2, Value3];
  // eslint-disable-next-line react-hooks/exhaustive-deps
}) => props.render(useMemo(() => props.init.map(at => atom(at)) as [Atom<Value>, Atom<Value2>, Atom<Value3>], []));

export const With3AtomsWithValue = <Value, Value2, Value3>(props: {
  render: (
    value: [Value, Atom<Value>],
    value2: [Value2, Atom<Value2>],
    value3: [Value3, Atom<Value3>],
  ) => React.ReactNode;

  atoms: [Value, Value2, Value3];
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const atoms = useMemo(() => props.atoms.map(at => atom(at)) as [Atom<Value>, Atom<Value2>, Atom<Value3>], []);

  return props.render(
    [useAtomValue(atoms[0]), atoms[0]],
    [useAtomValue(atoms[1]), atoms[1]],
    [useAtomValue(atoms[2]), atoms[2]],
  );
};
