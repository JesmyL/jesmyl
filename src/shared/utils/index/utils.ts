import { mylib } from '#shared/lib/my-lib';
import { IndexAppAccessRightTitles } from 'shared/model/index/access-rights';
import { SMyLib } from '../SMyLib';

const operations = {
  C: 0,
  R: 1,
  U: 2,
  D: 3,
};

export type CRUDOperation = keyof typeof operations;
export const accessRightsCRUDOperations = SMyLib.keys(operations);

export const checkUserScopeAccessRight = <
  Scope extends keyof IndexAppAccessRightTitles,
  Rule extends keyof IndexAppAccessRightTitles[Scope],
  Rights extends Partial<{ [K in Scope]: Partial<{ [K in Rule]: number }> }>,
>(
  rights: Rights | nil,
  scope: Scope,
  rule: Rule | Rule[],
  operation: CRUDOperation | CRUDOperation[] = 'R',
) => {
  try {
    if (rights == null || rights[scope] == null) return false;

    rule = mylib.isArr(rule) ? rule : [rule];
    operation = mylib.isArr(operation) ? operation : [operation];

    if (operation.length === 0 || rule.length === 0) return false;

    for (const ruleItem of rule) {
      const accessBinary = (rights[scope][ruleItem]! >>> 0).toString(2).padStart(4, '0');

      for (const operationItem of operation) {
        if (accessBinary[operations[operationItem]] !== '1') return false;
      }
    }

    return true;
  } catch (_) {
    return false;
  }
};

export const updateCRUDAccesRightValue = (prev: number, operation: CRUDOperation, value: boolean) => {
  const accessArr = (prev >>> 0).toString(2).padStart(4, '0').split('');
  accessArr[operations[operation]] = value ? '1' : '0';
  return parseInt(accessArr.join(''), 2);
};
