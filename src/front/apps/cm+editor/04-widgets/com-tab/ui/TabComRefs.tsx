import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { Button } from '#shared/components';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { WithHook } from '#shared/ui/WithHook';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import {
  CmCom,
  CmComFaceList,
  CmComJoinGroupList,
  CmComWithComListSearchFilterInput,
  useCmCom,
  useCmComList,
} from '$cm/ext';
import { Atom, atom } from 'atomaric';
import { CmComWid } from 'shared/api';
import { itIt } from 'shared/utils';

let searchAtom: Atom<string>;
let otherRefGroupAtom: Atom<CmComWid | nil>;

export const CmEditorComTabComRefs = ({ ccom }: { ccom: EditableCom }) => {
  searchAtom ??= atom('');
  otherRefGroupAtom ??= atom<CmComWid | nil>(null);

  const checkAccess = useCheckUserAccessRightsInScope();

  return (
    <>
      <Modal openAtom={otherRefGroupAtom}>
        {withComw => (
          <>
            <ModalHeader>Другая группа ассоциации</ModalHeader>
            <ModalBody>
              <div>Данная песня состоит в другой группе ассоциаций</div>
              <WithHook
                args={[withComw]}
                hook={useCmCom}
              >
                {otherCom => otherCom && <CmComJoinGroupList com={otherCom} />}
              </WithHook>
            </ModalBody>
            <ModalFooter>
              <Button
                className="text-xKO"
                onClick={async () => {
                  await cmEditComExternalsClientTsjrpcMethods.switchComwRefs({
                    comw: ccom.wid,
                    withComw,
                  });

                  otherRefGroupAtom.reset();
                }}
              >
                Переместить (удалить из этой группы)
              </Button>
            </ModalFooter>
          </>
        )}
      </Modal>

      <CmComJoinGroupList
        com={ccom}
        emptyNode={<div className="my-5 text-x7 w-full text-center">Ссылок нет</div>}
        children={(comRefList, allRefs) =>
          checkAccess('cm', 'COM_REF', 'C') && (
            <WithHook
              args={[null, comRefList.concat(ccom.wid)]}
              hook={useCmComList}
            >
              {coms => (
                <>
                  <CmComWithComListSearchFilterInput
                    Constructor={CmCom}
                    termAtom={searchAtom}
                    coms={coms}
                    children={({ inputNode, searchedComs, term }) => {
                      return (
                        <div className="flex flex-col gap-3 mt-15">
                          {inputNode}
                          <div className="w-full">
                            {term && (
                              <CmComFaceList
                                list={searchedComs.slice(0, 10)}
                                isPutCcomFaceOff={false}
                                importantOnClick={itIt}
                                comDescription={withCom => {
                                  return (
                                    <>
                                      <Button
                                        icon="PlusSignSquare"
                                        className={allRefs[withCom.wid] != null ? undefined : 'text-xOK'}
                                        onClick={() => {
                                          if (allRefs[withCom.wid] != null) {
                                            otherRefGroupAtom.set(withCom.wid);
                                            return;
                                          }

                                          cmEditComExternalsClientTsjrpcMethods.switchComwRefs({
                                            comw: ccom.wid,
                                            withComw: withCom.wid,
                                          });
                                        }}
                                      />
                                    </>
                                  );
                                }}
                              />
                            )}
                          </div>
                        </div>
                      );
                    }}
                  />

                  <hr className="my-5" />
                </>
              )}
            </WithHook>
          )
        }
        comDescription={
          checkAccess('cm', 'COM_REF', 'D')
            ? withCom => {
                return (
                  <>
                    <TheIconButton
                      confirm="Удалить ссылку?"
                      icon="Delete02"
                      className="text-xKO"
                      onClick={() =>
                        cmEditComExternalsClientTsjrpcMethods.switchComwRefs({
                          comw: ccom.wid,
                          withComw: withCom.wid,
                        })
                      }
                    />
                  </>
                );
              }
            : undefined
        }
      />
    </>
  );
};
