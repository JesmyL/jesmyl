import Correct from './Correct';
import { ICorrect, ICorrectsBoxes } from './CorrectsBox.model';

type ArrayMapCb<T> = (box: T, boxi: number, boxa: T[]) => T;
type ArrayCb<T> = (box: T, boxi: number, boxa: T[]) => unknown;

export class CorrectsBox {
  errors: Correct[] | null;
  warnings: Correct[] | null;
  unknowns: Correct[] | null;
  collection: Correct[] | null = null;
  incorrectType?: string | boolean;

  constructor(errors?: ICorrect[] | nil, warnings?: ICorrect[] | nil, unknowns?: ICorrect[] | nil) {
    this.errors = Array.isArray(errors) && errors.length ? this.correctifyLine(errors) : null;
    this.warnings = Array.isArray(warnings) && warnings.length ? this.correctifyLine(warnings) : null;
    this.unknowns = Array.isArray(unknowns) && unknowns.length ? this.correctifyLine(unknowns) : null;
  }

  correctifyLine(line: ICorrect[]) {
    return line.map(correct => this.correctify(correct));
  }

  correctify(correct: ICorrect) {
    return new Correct(correct);
  }

  setIncorrectType(message: string) {
    this.incorrectType = message || true;
    return this;
  }

  collect(...args: (keyof ICorrectsBoxes)[]) {
    this.collection = [];

    args.forEach((arg: keyof ICorrectsBoxes) => {
      if (['errors', 'warnings', 'unknowns'].indexOf(arg) > -1 && Array.isArray(this[arg])) {
        this.collection = this.collection?.concat(this[arg] || []) ?? [];
      }
    });

    if (!this.collection.length) this.collection = null;

    return this;
  }

  map(cb: ArrayMapCb<Correct>) {
    if (!Array.isArray(this.collection)) return this;
    this.collection = this.collection.map(cb);

    return this;
  }

  filter(cb: ArrayCb<ICorrect> = e => e) {
    if (!Array.isArray(this.collection)) return this;
    this.collection = this.collection.filter(cb);

    return this;
  }

  merge(...args: (Partial<ICorrectsBoxes> | nil)[]) {
    const merge = <Name extends keyof ICorrectsBoxes>(arg: Partial<ICorrectsBoxes>, name: Name) => {
      const target = this[name];
      const source = arg[name];

      if (Array.isArray(target)) {
        if (Array.isArray(source))
          source.forEach(src => {
            const previ = target.findIndex(tar => tar.uniq === src.uniq);

            if (previ < 0) target.push(this.correctify(src));
            else target.splice(previ, 1, this.correctify(src));
          });
      } else if (Array.isArray(source)) this[name] = [source].flat();
    };

    args.forEach(arg => {
      if (arg == null) return;
      merge(arg, 'errors');
      merge(arg, 'warnings');
      merge(arg, 'unknowns');
    });

    return this;
  }

  setErrors(errors: ICorrect[] | null) {
    this.errors = errors && this.correctifyLine(errors);
  }

  setWarnings(warnings: ICorrect[] | null) {
    this.warnings = warnings && this.correctifyLine(warnings);
  }

  setUnknowns(unknowns: ICorrect[] | null) {
    this.unknowns = unknowns && this.correctifyLine(unknowns);
  }

  setAll(box: CorrectsBox) {
    const { errors, warnings, unknowns } = box;
    if (errors !== undefined) this.setErrors(errors);
    if (warnings !== undefined) this.setWarnings(warnings);
    if (unknowns !== undefined) this.setUnknowns(unknowns);
  }

  remove(errors: Correct[] | null, warnings: Correct[] | null, unknowns: Correct[] | null) {
    this.errors = errors == null ? this.errors : this.errors?.filter(correct => errors.indexOf(correct) < 0) ?? null;
    this.warnings =
      warnings == null ? this.warnings : this.warnings?.filter(correct => warnings.indexOf(correct) < 0) ?? null;
    this.unknowns =
      unknowns == null ? this.unknowns : this.unknowns?.filter(correct => unknowns.indexOf(correct) < 0) ?? null;
  }

  removeFrom(box: CorrectsBox | nil) {
    if (!box) return;
    const { errors, warnings, unknowns } = box;
    this.remove(errors, warnings, unknowns);
  }

  isSome() {
    return this.errors !== null || this.unknowns !== null || this.warnings !== null;
  }
}
