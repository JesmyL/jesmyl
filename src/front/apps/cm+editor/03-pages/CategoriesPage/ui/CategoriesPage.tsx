import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TextInput } from '#shared/ui/TextInput';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { WithAtom } from '#shared/ui/WithAtom';
import { WithAtomTruthfulValue } from '#shared/ui/WithAtomTruthfulValue';
import { CmEditorCat } from '$cm+editor/entities/cat';
import { cmEditCatClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useEditableCats } from '$cm+editor/shared/lib/useEditableCat';
import { PageCmEditorContainer } from '$cm+editor/shared/ui/PageCmEditorContainer';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { atom } from 'atomaric';
import { useMemo, useState } from 'react';
import { CmCatKind, CmCatWid } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import {
  CmEditorCategoriesModal,
  cmEditorCategoriesPageKindCodes,
  takeCmEditorCategoriesPageKindItems,
  takeCmEditorCategoriesPageKindTitle,
} from '../model';

const takeRemovedCatsQueryKey = ['takeRemovedCats'];

export const CmEditorCategoriesPage = () => {
  const cats = useEditableCats();
  const checkAccess = useCheckUserAccessRightsInScope();
  const isCanUpdate = checkAccess('cm', 'CAT', 'U');

  return (
    <WithAtom init={false}>
      {isMoreOpenAtom => (
        <WithAtom init={CmEditorCategoriesModal.none}>
          {modalAtom => (
            <>
              <PageCmEditorContainer
                className="cm-editor-categories"
                headTitle={translateBase(BaseLocaleKey.CmEditorCategories)}
                onMoreClick={isCanUpdate ? isMoreOpenAtom.set : undefined}
                content={
                  <>
                    {cats && !cats.length ? (
                      <div className="text-x7 my-3">{translateBase(BaseLocaleKey.EmptyList)}</div>
                    ) : null}
                    {cats?.map(cat => (
                      <CmEditorCatRow
                        key={cat.wid}
                        cat={cat}
                        isCanUpdate={isCanUpdate}
                      />
                    ))}
                  </>
                }
              />

              <WithAtomTruthfulValue atom={isMoreOpenAtom}>
                <BottomPopup onClose={isMoreOpenAtom.reset}>
                  <BottomPopupItem
                    icon="PlusSignCircle"
                    title={translateBase(BaseLocaleKey.CmEditorCategoryCreate)}
                    onClick={() => modalAtom.set(CmEditorCategoriesModal.create)}
                  />
                  <BottomPopupItem
                    icon="FileRemove"
                    title={translateBase(BaseLocaleKey.CmEditorRemovedCats)}
                    onClick={() => modalAtom.set(CmEditorCategoriesModal.removed)}
                  />
                </BottomPopup>
              </WithAtomTruthfulValue>

              <WithAtomTruthfulValue
                atom={modalAtom}
                checkIsOpen={modal => modal === CmEditorCategoriesModal.create}
              >
                <Modal
                  openAtom={modalAtom}
                  isRenderHere
                >
                  <CmEditorCatCreateModal onClose={modalAtom.reset} />
                </Modal>
              </WithAtomTruthfulValue>

              <WithAtomTruthfulValue
                atom={modalAtom}
                checkIsOpen={modal => modal === CmEditorCategoriesModal.removed}
              >
                <Modal
                  openAtom={modalAtom}
                  isRenderHere
                >
                  <CmEditorRemovedCatsModalInner />
                </Modal>
              </WithAtomTruthfulValue>
            </>
          )}
        </WithAtom>
      )}
    </WithAtom>
  );
};

const CmEditorCatCreateModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState('');
  const [kind, setKind] = useState<CmCatKind>(cmEditorCategoriesPageKindCodes[0]);

  const create = async () => {
    await cmEditCatClientTsjrpcMethods.create({ n: name, k: kind });
    onClose();
  };

  return (
    <>
      <ModalHeader>{translateBase(BaseLocaleKey.CmEditorCategoryCreate)}</ModalHeader>
      <ModalBody>
        <div className="flex flex-col gap-2">
          <TextInput
            autoFocus
            placeholder={translateBase(BaseLocaleKey.CmEditorCategoryTitle)}
            defaultValue={name}
            onInput={setName}
          />
          <Dropdown
            label={translateBase(BaseLocaleKey.CmEditorCategoryKind)}
            id={kind}
            items={takeCmEditorCategoriesPageKindItems()}
            onSelectId={setKind}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          icon="PlusSign"
          disabled={!name.trim()}
          onClick={create}
        >
          {translateBase(BaseLocaleKey.Create)}
        </Button>
      </ModalFooter>
    </>
  );
};

const CmEditorRemovedCatsModalInner = () => {
  const queryClient = useQueryClient();
  const { data: icats } = useQuery({
    queryKey: takeRemovedCatsQueryKey,
    queryFn: () => cmEditCatClientTsjrpcMethods.takeRemovedCats(),
  });

  const restore = async (catw: CmCatWid) => {
    await cmEditCatClientTsjrpcMethods.restore({ catw });
    await queryClient.invalidateQueries({ queryKey: takeRemovedCatsQueryKey });
  };

  return (
    <>
      <ModalHeader>{translateBase(BaseLocaleKey.CmEditorRemovedCats)}</ModalHeader>
      <ModalBody>
        {icats?.map(cat => (
          <div
            key={cat.w}
            className="my-3 pb-3 border-b border-x3 flex flex-wrap gap-2 items-center"
          >
            <span className="font-bold">{cat.n}</span>
            <span className="text-x7">{takeCmEditorCategoriesPageKindTitle(cat.k)}</span>
            <TheIconSendButton
              icon="PlusSignCircle"
              className="text-xOK"
              confirm={translateBase(BaseLocaleKey.CmComeBack)}
              onSend={() => restore(cat.w)}
            />
          </div>
        ))}
      </ModalBody>
    </>
  );
};

const CmEditorCatRow = ({ cat, isCanUpdate }: { cat: CmEditorCat; isCanUpdate: boolean }) => {
  const queryClient = useQueryClient();
  const isEditOpenAtom = useMemo(() => atom(false), []);
  const isEmpty = !cat.comws.length;
  const storedName = cat.top.n;
  const [name, setName] = useState(storedName);
  const [kind, setKind] = useState(cat.kind);

  const openEdit = () => {
    setName(storedName);
    setKind(cat.kind);
    isEditOpenAtom.set(true);
  };

  const save = async () => {
    const nextName = name.trim();
    if (!nextName) return;

    if (nextName !== storedName) await cmEditCatClientTsjrpcMethods.rename({ catw: cat.wid, n: nextName });
    if (isEmpty && kind !== cat.kind) await cmEditCatClientTsjrpcMethods.setKind({ catw: cat.wid, k: kind });

    isEditOpenAtom.reset();
  };

  const remove = async () => {
    await cmEditCatClientTsjrpcMethods.remove({ catw: cat.wid });
    await queryClient.invalidateQueries({ queryKey: takeRemovedCatsQueryKey });
    isEditOpenAtom.reset();
  };

  return (
    <div className="my-3 pb-3 border-b border-x3 flex flex-wrap gap-2 items-center">
      <span className="font-bold">{cat.name}</span>
      <span className="text-x7">{takeCmEditorCategoriesPageKindTitle(cat.kind)}</span>
      <span className="text-x7">{translateBase(BaseLocaleKey.CmEditorCategoryComsCount, { c: cat.comws.length })}</span>

      {cat.wid === CmCatWid.all || !isCanUpdate || (
        <TheIconButton
          icon="Edit02"
          onClick={openEdit}
        />
      )}

      <Modal openAtom={isEditOpenAtom}>
        <ModalHeader className="flex w-full justify-between">
          <span>{translateBase(BaseLocaleKey.CmEditorCategoryEdit)}</span>
          <TheIconButton
            icon="Delete02"
            className="text-xKO"
            confirm={translateBase(BaseLocaleKey.DeleteX, { x: cat.name })}
            onClick={remove}
          />
        </ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2">
            <TextInput
              autoFocus
              placeholder={translateBase(BaseLocaleKey.CmEditorCategoryTitle)}
              defaultValue={storedName}
              onInput={setName}
            />

            {isEmpty ? (
              <Dropdown
                label={translateBase(BaseLocaleKey.CmEditorCategoryKind)}
                id={kind}
                items={takeCmEditorCategoriesPageKindItems()}
                onSelectId={setKind}
              />
            ) : (
              <span className="text-x7">{translateBase(BaseLocaleKey.CmEditorCategoryKindLocked)}</span>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            icon="CheckmarkCircle01"
            disabled={!name.trim()}
            onClick={save}
          >
            {translateBase(BaseLocaleKey.CmEditorApply)}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};
