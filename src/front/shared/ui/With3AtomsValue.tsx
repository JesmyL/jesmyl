import { Atom, useAtomValue } from 'atomaric';

export const With3AtomsValue = <Value, Value2, Value3>(props: {
  render: (value: Value, value2: Value2, value3: Value3) => React.ReactNode;
  atoms: [Atom<Value>, Atom<Value2>, Atom<Value3>];
}) => props.render(useAtomValue(props.atoms[0]), useAtomValue(props.atoms[1]), useAtomValue(props.atoms[2]));
