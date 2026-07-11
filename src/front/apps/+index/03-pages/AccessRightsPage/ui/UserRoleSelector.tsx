import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { usePrompt } from '#shared/ui/modal';
import { indexAppUserRoleInfoDictAtom, indexOpenAccessRoleRedactorAtom } from '$index/shared/state';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useAtomValue } from 'atomaric';
import { SokiAuthLogin, UserInfoUnsecure } from 'shared/api';
import { objectKeys } from 'shared/utils/object.utils';

export const IndexAccessRightsUserRoleSelector = ({
  userInfo,
  userLogin,
}: {
  userInfo: UserInfoUnsecure;
  userLogin: SokiAuthLogin;
}) => {
  const userRightsAndRoles = useAtomValue(indexAppUserRoleInfoDictAtom);
  const prompt = usePrompt();

  if (!userRightsAndRoles) return;

  return (
    <>
      <div className="flex gap-3 mb-5 ml-3">
        Роль
        <Dropdown
          id={userInfo.r ?? null}
          nullTitle="Без роли"
          items={objectKeys(userRightsAndRoles).map(id => ({ id, title: id }))}
          renderItem={({ node, id, afterClickAction }) => (
            <div className="flex gap-2 w-max">
              {node}
              {id && id !== 'TOP' && (
                <Button
                  icon="Edit02"
                  onClick={event => {
                    event.stopPropagation();
                    indexOpenAccessRoleRedactorAtom.set(id);
                    afterClickAction();
                  }}
                />
              )}
            </div>
          )}
          onSelectId={role => indexTsjrpcClientMethods.updateUserAccessRole({ login: userLogin, role })}
          addContent={
            <Button
              icon="PlusSign"
              className="text-x7 w-max"
              onClick={async () => {
                const roleName = await prompt('Введите название для роли', 'Новая роль');
                if (!roleName) return;
                return indexTsjrpcClientMethods.addNewAccessRole({ role: roleName as 'TOP' });
              }}
            >
              Роль
            </Button>
          }
        />
      </div>
    </>
  );
};
