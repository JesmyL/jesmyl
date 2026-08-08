import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { Button } from '#shared/components';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComExternalsClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { CmComFaceList, CmComJoinGroupList, CmComWithComListSearchFilterInput } from '$cm/ext';
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
              <CmComJoinGroupList comw={withComw} />
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
        comw={ccom.wid}
        emptyNode={<div className="my-5 text-x7 w-full text-center">Ссылок нет</div>}
        children={(comRefList, allRefs) =>
          checkAccess('cm', 'COM_REF', 'C') && (
            <>
              <CmComWithComListSearchFilterInput
                termAtom={searchAtom}
                comws={comRefList.concat(ccom.wid)}
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
                                    className={allRefs[withCom.w] != null ? '' : 'text-xOK'}
                                    onClick={() => {
                                      if (allRefs[withCom.w] != null) {
                                        otherRefGroupAtom.set(withCom.w);
                                        return;
                                      }

                                      cmEditComExternalsClientTsjrpcMethods.switchComwRefs({
                                        comw: ccom.wid,
                                        withComw: withCom.w,
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
                          withComw: withCom.w,
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
