import { knownStameskaIconNames } from 'shared/values/index/known-icons';

export interface IndexValues {
  chatUrl?: string;
}

export type KnownStameskaIconName = (typeof knownStameskaIconNames)[number];
