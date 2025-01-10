import { Com } from '../com/Com';
import { Cat } from './Cat';

export interface ComWrap<C = Com> {
  item: C;
  deep?: number;
  field?: string;
  rate?: number;
}

export type CatKind = string;

export interface CatTracker {
  title: string;
  id: CatKind;
  select: (com: Com, cat: Cat) => boolean;
}
