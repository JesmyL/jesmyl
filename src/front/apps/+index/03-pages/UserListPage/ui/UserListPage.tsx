import { translateBase } from '#basis/locale';
import { QueryKey } from '#basis/model/QueryKey.model';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { Modal, ModalBody, ModalHeader, usePrompt } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { WithAtomTruthfulValue } from '#shared/ui/WithAtomTruthfulValue';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import {
  indexAppUserInfoDictAtom,
  indexAppUserRoleInfoDictAtom,
  indexOpenAccessRoleRedactorAtom,
} from '$index/shared/state/atoms';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc/tsjrpc.methods';
import { useQuery } from '@tanstack/react-query';
import { atom, useAtomValue } from 'atomaric';
import { useEffect, useMemo, useState } from 'react';
import type { UserInfoUnsecure, UserLogin } from 'shared/api/complect/soki.model';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { checkIsNotNil } from 'shared/utils/checkIs';
import { checkUserScopeAccessRight, makeTopAccessRights } from 'shared/utils/index/utils';
import { objectEntries, objectKeys, objectLength } from 'shared/utils/object.utils';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { twMerge } from 'tailwind-merge';
import { IndexUserListAccessRightsUpdateTable } from './AccessRightsUpdateTable';
import { IndexUserListAccessRightsUserPushCheck } from './UserPushCheck';
import { IndexUserListAccessRightsUserRoleSelector } from './UserRoleSelector';

// Собирает строку для поиска по пользователю: имя, логины, данные авторизации и роль.
const takeUserSearchText = (userInfo: UserInfoUnsecure) =>
  [
    userInfo.l,
    ...(userInfo.ls ?? []),
    userInfo.uauth.login,
    userInfo.uauth.fio,
    userInfo.uauth.nick,
    userInfo.uauth.email,
    userInfo.uauth.tgId,
    userInfo.r,
  ]
    .filter(checkIsNotNil)
    .join(' ')
    .toLowerCase();

// Сортирует пользователей так, чтобы сначала шли обладатели роли, а внутри группы — по имени.
const compareUsersByRoleThenName = (
  [loginA, infoA]: [string, UserInfoUnsecure | nil],
  [loginB, infoB]: [string, UserInfoUnsecure | nil],
) =>
  Number(!infoA?.r) - Number(!infoB?.r) ||
  (takeUserAuthName(infoA?.uauth) || loginA).localeCompare(takeUserAuthName(infoB?.uauth) || loginB);

export function IndexUserListPage() {
  const userInfoDict = useAtomValue(indexAppUserInfoDictAtom);
  const roleInfoDict = useAtomValue(indexAppUserRoleInfoDictAtom);
  // Заголовки скоупов и правил нужны для фабрикации полной карты прав роли TOP;
  // ключ совпадает с запросом таблицы прав, поэтому данные берутся из её кэша без лишнего вызова.
  const { data: accessRightTitles } = useQuery({
    queryKey: [QueryKey.AccessRightTitles],
    queryFn: () => indexTsjrpcClientMethods.getAccessRightTitles(),
  });
  const prompt = usePrompt();
  const [searchTermAtom] = useState(() => atom(''));
  // Логин пользователя, для которого открыт нижний попап с правами и PUSH-проверкой.
  const [selectedUserLoginAtom] = useState(() => atom<UserLogin | null>(null));
  // Флаг открытия нижнего попапа с дополнительными действиями по ролям.
  const [isMoreOpenAtom] = useState(() => atom(false));
  const searchTerm = useAtomValue(searchTermAtom).trim().toLowerCase();
  // Отфильтрованный и отсортированный список пользователей пересчитывается только при смене данных или поиска.
  const userEntries = useMemo(
    () =>
      objectEntries(userInfoDict)
        .filter(
          ([, userInfo]) =>
            checkIsNotNil(userInfo) && (!searchTerm || takeUserSearchText(userInfo).includes(searchTerm)),
        )
        .sort(compareUsersByRoleThenName),
    [userInfoDict, searchTerm],
  );

  // При входе на страницу подтягиваем пользователей и роли, чтобы список и таблицы прав были полными.
  useEffect(() => {
    (async () => {
      indexAppUserInfoDictAtom.set(await indexTsjrpcClientMethods.getUserInfoDict());
      indexAppUserRoleInfoDictAtom.set(await indexTsjrpcClientMethods.getRoleUnfoDict());
    })();
  }, []);

  return (
    <>
      <PageContainerConfigurer
        className="index-access-rights"
        headTitle={translateBase(BaseLocaleKey.Users)}
        onMoreClick={isMoreOpenAtom.set}
        content={
          <>
            {/* Поиск по пользователям: фильтрует список по имени, логинам и роли. */}
            <DebouncedSearchInput
              className="debounced-searcher round-styled mb-2"
              placeholder={translateBase(BaseLocaleKey.Search)}
              termAtom={searchTermAtom}
            />

            {/* Список пользователей: строка занимает всю ширину списка, содержимое центрируется текстом; клик открывает попап с правами и PUSH-проверкой. */}
            <div className="flex flex-col gap-1">
              {userEntries.map(([userLogin, userInfo]) => {
                if (!userInfo) return null;

                return (
                  <button
                    key={userLogin}
                    className="pointer block w-full rounded-lg px-2 py-2 text-center even:bg-x2/40"
                    onClick={() => selectedUserLoginAtom.set(userLogin)}
                  >
                    <span
                      className={twMerge(
                        'inline-block max-w-full truncate align-middle',
                        objectLength(userInfo) < 2 && 'opacity-70',
                      )}
                    >
                      {takeUserAuthName(userInfo.uauth)}
                    </span>
                    {userInfo.r && <span className="text-x7"> ({userInfo.r})</span>}
                  </button>
                );
              })}
            </div>

            {/* Редактор ролей доступен из нижнего попапа кнопки «ещё» в шапке страницы. */}
            <Modal
              openAtom={indexOpenAccessRoleRedactorAtom}
              className="z-1000"
            >
              <WithAtomValue atom={indexOpenAccessRoleRedactorAtom}>
                {role => (
                  <>
                    <ModalHeader>{role}</ModalHeader>
                    {role && (
                      <ModalBody>
                        <IndexUserListAccessRightsUpdateTable
                          onChange={({ operation, rule, scope }) =>
                            indexTsjrpcClientMethods.updateRoleAccessRight({ operation, role, rule, scope })
                          }
                          takeIsChecked={(scope, rule, operation) =>
                            checkUserScopeAccessRight(roleInfoDict?.[role]?.r, null, scope as never, rule, operation)
                          }
                        />
                      </ModalBody>
                    )}
                  </>
                )}
              </WithAtomValue>
            </Modal>
          </>
        }
      />

      {/* Попап выбранного пользователя: селектор роли, таблица прав и PUSH-проверка его устройств. */}
      <WithAtomTruthfulValue atom={selectedUserLoginAtom}>
        {userLogin => {
          const userInfo = userInfoDict?.[userLogin];
          if (!userInfo) return null;

          return (
            <BottomPopup
              title={takeUserAuthName(userInfo.uauth)}
              onClose={selectedUserLoginAtom.reset}
            >
              <IndexUserListAccessRightsUserRoleSelector
                userLogin={userLogin}
                userInfo={userInfo}
              />

              <div className="ml-3">
                <IndexUserListAccessRightsUpdateTable
                  takeIsChecked={(scope, rule, operation) =>
                    checkUserScopeAccessRight(
                      userInfo.r ? roleInfoDict?.[userInfo.r]?.r : null,
                      userInfo.r === 'TOP' ? makeTopAccessRights(accessRightTitles) : userInfo.rights,
                      scope as never,
                      rule,
                      operation,
                    )
                  }
                  takeRuleClassName={(scope, rule) =>
                    twMerge(checkIsNotNil(userInfo.rights?.[scope as never]?.[rule]) && 'text-x7')
                  }
                  onChange={({ operation, rule, scope }) =>
                    indexTsjrpcClientMethods.updateUserAccessRight({
                      login: userLogin,
                      operation,
                      rule,
                      scope,
                    })
                  }
                />
              </div>

              <IndexUserListAccessRightsUserPushCheck userId={userInfo.id} />
            </BottomPopup>
          );
        }}
      </WithAtomTruthfulValue>

      {/* Нижний попап дополнительных действий: создание роли и переход к редактированию существующих. */}
      <WithAtomTruthfulValue atom={isMoreOpenAtom}>
        <BottomPopup onClose={isMoreOpenAtom.reset}>
          <BottomPopupItem
            icon="PlusSign"
            title={translateBase(BaseLocaleKey.Role)}
            onClick={async () => {
              // Спрашиваем имя новой роли и сразу создаём её на сервере.
              const roleName = await prompt(
                translateBase(BaseLocaleKey.EnterRoleName),
                translateBase(BaseLocaleKey.NewRole),
              );
              if (!roleName) return;
              return indexTsjrpcClientMethods.addNewAccessRole({ role: roleName as 'TOP' });
            }}
          />
          {/* Роль TOP всемогуща и не редактируется — в списке показываем только остальные роли. */}
          {!roleInfoDict ||
            objectKeys(roleInfoDict)
              .filter(role => role !== 'TOP')
              .map(role => (
                <BottomPopupItem
                  key={role}
                  icon="Edit02"
                  title={role}
                  onClick={() => indexOpenAccessRoleRedactorAtom.set(role)}
                />
              ))}
        </BottomPopup>
      </WithAtomTruthfulValue>
    </>
  );
}
