import { Atom, useAtomValue } from 'atomaric';

export const With2AtomsValue = <Value, Value2>(props: {
  render: (value: Value, value2: Value2) => React.ReactNode;
  atoms: [Atom<Value>, Atom<Value2>];
}) => props.render(useAtomValue(props.atoms[0]), useAtomValue(props.atoms[1]));
