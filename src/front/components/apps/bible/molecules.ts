import { Molecule } from '../../../complect/atoms';
import { BibleStorage } from './model';

export const bibleMolecule = new Molecule<BibleStorage>(
  {
    kas: null,
    nrt: null,
    rst: { chapters: [] },
  },
  'bible',
);
