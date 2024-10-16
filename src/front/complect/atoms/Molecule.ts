import { SMyLib } from '../../models';
import mylib from '../my-lib/MyLib';
import { Atom } from './AnAtom';

export class Molecule<
  T,
  StorageName extends string = string,
  Atoms extends { [Key in keyof T]: Atom<T[Key]> } = { [Key in keyof T]: Atom<T[Key]> },
> {
  private atoms = {} as Atoms;
  private newAtom: <Key extends keyof T>(key: Key) => Atom<T[Key]>;
  private keys: (keyof T)[] = [];

  constructor(values: Required<{ [Key in keyof T]: T[Key] | Atom<T[Key]> }>, storageName: StorageName) {
    this.atoms = {
      ...SMyLib.entries(values).reduce((atoms: Atoms, [key, value]) => {
        this.keys.push(key);

        (atoms as any)[key] = value instanceof Atom ? value : new Atom(value, storageName, key as string);
        return atoms;
      }, {} as Atoms),
    };

    this.newAtom = key => (this.atoms[key] = new Atom(undefined as never, storageName, key as string) as never)!;
  }

  set = <Key extends keyof T>(key: Key, value: T[Key]) =>
    (this.atoms[key] === undefined ? this.newAtom(key) : this.atoms[key]).set(value as never);

  get = <Key extends keyof T>(key: Key): T[Key] => this.atoms[key]?.get() as never;

  take = <Key extends keyof T>(key: Key): NonUndefined<Atoms[Key]> => this.atoms[key] as never;

  select = <Value>(selector: (atoms: Atoms) => Atom<Value>): NonUndefined<Atom<Value>> => selector(this.atoms);

  rem = <Key extends keyof T>(key: Key) => this.atoms[key].rem();

  private reduceKeyValues = (dict: T, key: keyof T) => {
    dict[key] = this.get(key);
    return dict;
  };

  values = () => this.keys.reduce(this.reduceKeyValues, {} as T);

  private addAtoms(atoms: Atoms) {
    this.atoms = {
      ...this.atoms,
      ...atoms,
    };

    this.keys = Array.from(new Set([...this.keys, ...mylib.keys(atoms)])) as never;
    return this;
  }

  with = <Values>(molecule: Molecule<Values>) => new Molecule({}, '').addAtoms(this.atoms).addAtoms(molecule.atoms);
}
