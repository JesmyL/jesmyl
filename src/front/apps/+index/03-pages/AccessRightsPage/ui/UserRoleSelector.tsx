import { Button } from '#shared/components/ui/button';
import { MyLib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { usePrompt } from '#shared/ui/modal';
import { indexAppUserAccessRightsMatrixAtom, indexOpenAccessRoleRedactorAtom } from '$index/shared/state';
import { indexTsjrpcClientMethods } from '$index/shared/tsjrpc';
import { useAtomValue } from 'atomaric';
import { SokiAuthLogin } from 'shared/api';
import { IndexAppUserAccessRights } from 'shared/model/index/access-rights';

export const IndexAccessRightsUserRoleSelector = ({
  userRights,
  userLogin,
}: {
  userRights: Required<IndexAppUserAccessRights>[SokiAuthLogin];
  userLogin: SokiAuthLogin;
}) => {
  const userRightsAndRoles = useAtomValue(indexAppUserAccessRightsMatrixAtom);
  const prompt = usePrompt();

  if (userRightsAndRoles?.roles == null) return;

  return (
    <>
      <div className="flex gap-3 mb-5 ml-3">
        Роль
        <Dropdown
          id={userRights.info.role ?? null}
          nullTitle="Без роли"
          items={MyLib.keys(userRightsAndRoles.roles).map(id => ({ id, title: id }))}
          renderItem={(node, id, afterClickAction) => (
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
