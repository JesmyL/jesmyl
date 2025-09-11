import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { SMyLib } from '../SMyLib';

const operations = {
  C: 0,
  R: 1,
  U: 2,
  D: 3,
};

export const accessRightsCRUDOperations = SMyLib.keys(operations);

export const checkUserScopeAccessRight = <
  Scope extends keyof IndexAppAccessRightTitles,
  Rule extends keyof IndexAppAccessRightTitles[Scope],
  Rights extends Partial<{ [K in Scope]: Partial<{ [K in Rule]: number }> }>,
>(
  rights: Rights,
  scope: Scope,
  rule: Rule,
  operation: keyof typeof operations = 'R',
) => {
  const accessNumber = rights?.[scope]?.[rule] ?? 0;
  const accessBinary = (accessNumber >>> 0).toString(2).padStart(4, '0');

  return accessBinary[operations[operation]] === '1';
};

export const updateCRUDAccesRightValue = (prev: number, operation: keyof typeof operations, value: boolean) => {
  const accessArr = (prev >>> 0).toString(2).padStart(4, '0').split('');
  accessArr[operations[operation]] = value ? '1' : '0';
  return parseInt(accessArr.join(''), 2);
};
