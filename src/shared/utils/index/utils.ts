import { mylib } from '#shared/lib/my-lib';
import {
  IndexAccessScopeRules,
  IndexAppAccessRightTitles,
  IndexAppUserAccessRightsWithoutInfo,
} from 'shared/model/index/access-rights';
import { SMyLib } from '../SMyLib';

const operations = {
  C: 0,
  R: 1,
  U: 2,
  D: 3,
};

export type CRUDOperation = keyof typeof operations;
export const accessRightsCRUDOperations = SMyLib.keys(operations);

const isUser_HasNo_AccessRights = false;
const isUser_Has_AccessRights = true;

export const checkUserScopeAccessRight = <
  Scope extends keyof IndexAppAccessRightTitles,
  Rule extends keyof IndexAppAccessRightTitles[Scope],
  Rights extends IndexAppUserAccessRightsWithoutInfo,
>(
  roleRights: IndexAccessScopeRules<{ m: number }> | nil,
  userRights: Rights | nil,
  scope: Scope,
  rule: Rule | Rule[],
  operation: CRUDOperation | CRUDOperation[] = 'R',
) => {
  try {
    rule = mylib.isArr(rule) ? rule : [rule];
    operation = mylib.isArr(operation) ? operation : [operation];

    if (operation.length === 0 || rule.length === 0) return isUser_HasNo_AccessRights;

    for (const ruleItem of rule) {
      const accessBinary = (
        (userRights?.[scope]?.[ruleItem as never] ??
          (userRights?.general?.ALL ? 15 : (roleRights?.[scope]?.[ruleItem as never] ?? 0))) >>> 0
      )
        .toString(2)
        .padStart(4, '0');

      for (const operationItem of operation) {
        if (accessBinary[operations[operationItem]] !== '1') return isUser_HasNo_AccessRights;
      }
    }

    return isUser_Has_AccessRights;
  } catch (_) {
    return isUser_HasNo_AccessRights;
  }
};

export const switchCRUDAccesRightValue = (prev: number, operation: CRUDOperation) => {
  const accessArr = (prev >>> 0).toString(2).padStart(4, '0').split('');
  accessArr[operations[operation]] = +accessArr[operations[operation]] ? '0' : '1';
  return parseInt(accessArr.join(''), 2);
};
