import { Exer } from '../../../complect/exer/Exer';
import { cmEditorMolecule } from './editor/molecules';

export const cmExer = new Exer(
  'cm',
  cmEditorMolecule.select(s => s.rules),
);
