import { Atom, useAtomValue } from 'atomaric';

export const With4AtomsValue = <Value, Value2, Value3, Value4>(props: {
  render: (value: Value, value2: Value2, value3: Value3, value4: Value4) => React.ReactNode;
  atoms: [Atom<Value>, Atom<Value2>, Atom<Value3>, Atom<Value4>];
}) =>
  props.render(
    useAtomValue(props.atoms[0]),
    useAtomValue(props.atoms[1]),
    useAtomValue(props.atoms[2]),
    useAtomValue(props.atoms[3]),
  );
