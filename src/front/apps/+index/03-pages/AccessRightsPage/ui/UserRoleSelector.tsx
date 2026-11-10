import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { indexAppUserRoleInfoDictAtom } from '$index/shared/state';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useAtomValue } from 'atomaric';
import { SokiAuthLogin, UserInfoUnsecure } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { objectKeys } from 'shared/utils/object.utils';

export const IndexAccessRightsUserRoleSelector = ({
  userInfo,
  userLogin,
}: {
  userInfo: UserInfoUnsecure;
  userLogin: SokiAuthLogin;
}) => {
  const userRightsAndRoles = useAtomValue(indexAppUserRoleInfoDictAtom);

  if (!userRightsAndRoles) return;

  // Селектор роли пользователя: показывает доступные роли и сохраняет выбранную на сервере.
  return (
    <div className="flex gap-3 mb-5 ml-3">
      {translateBase(BaseLocaleKey.Role)}
      <Dropdown
        id={userInfo.r ?? null}
        nullTitle={translateBase(BaseLocaleKey.WithoutRole)}
        items={objectKeys(userRightsAndRoles).map(id => ({ id, title: id }))}
        onSelectId={role => indexTsjrpcClientMethods.updateUserAccessRole({ login: userLogin, role })}
      />
    </div>
  );
};
