import { useAtom } from '#shared/lib/atom';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { LoadIndicatedContent } from '#shared/ui/load-indicated-content/LoadIndicatedContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { removedCategoriesAtom } from '$cm+editor/basis/lib/atoms/cat';
import { cmCatClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { useEditableCcat } from '$cm+editor/basis/lib/hooks/useEditableCat';
import { PageCmEditorContainer } from '$cm+editor/basis/ui/PageCmEditorContainer';
import { InputWithLoadingIcon } from '$cm/base/InputWithLoadingIcon';
import { catTrackers } from '$cm/col/cat/Cat.complect';
import { ComFaceList } from '$cm/col/com/face/list/ComFaceList';
import { useParams } from '@tanstack/react-router';
import { useState } from 'react';
import { CmCatWid } from 'shared/api';
import { emptyFunc } from 'shared/utils';

export const EditCategoryPage = () => {
  const [removedCats, setRemovedCats] = useAtom(removedCategoriesAtom);
  const ccatw = (+useParams({ from: '/cm/edit/cats/$catw' }).catw! as CmCatWid) || CmCatWid.def;
  const ccat = useEditableCcat(ccatw);
  const [isShowComs, setIsShowComs] = useState(false);

  if (!ccat) {
    if (mylib.isNaN(ccatw) || removedCats[ccatw] == null) return null;

    return (
      <PageCmEditorContainer
        className="edit-category"
        headTitle={`Категория - ${removedCats[ccatw]}`}
        content={
          <div className="flex column">
            <h2 className="color--ko">Категория удалена</h2>
            <TheIconButton
              icon="MapsRefresh"
              postfix="Восстановить"
              className="color--ok"
              onClick={() => cmCatClientInvocatorMethods.bringBackToLife({ catw: ccatw })}
            />
          </div>
        }
      />
    );
  }

  return (
    <PageCmEditorContainer
      className="edit-category"
      headTitle={`Категория - ${ccat.initialName}`}
      content={
        <>
          <InputWithLoadingIcon
            icon="TextFont"
            defaultValue={ccat.name}
            label="Название"
            onChange={value => cmCatClientInvocatorMethods.rename({ catw: ccat.wid, name: value })}
          />

          <div className="flex between">
            <span>Тип:</span>
            <div className="half-width">
              <Dropdown
                id={ccat.kind}
                items={catTrackers}
                onSelect={kind => {
                  cmCatClientInvocatorMethods.setKind({ catw: ccat.wid, kind: kind.id });
                }}
              />
            </div>
            {ccat.kind !== 'list' && ccat.coms.length > 0 && (
              <TheIconButton
                icon="Cancel01"
                postfix="Очистить список"
                confirm="Список восстановить не получится"
                onClick={() => cmCatClientInvocatorMethods.clearStack({ catw: ccat.wid })}
              />
            )}
          </div>
          <div
            className="pointer"
            onClick={() => setIsShowComs(!isShowComs)}
          >
            {isShowComs ? ' Скрыть' : ' Показать'} список песен {ccat.coms.length}
          </div>

          <div className="flex center margin-gap-v">
            <TheIconButton
              icon="CancelCircle"
              className="color--ko"
              postfix="Удалить категорию"
              confirm
              onClick={() => {
                setRemovedCats(prev => ({ ...prev, [ccat.wid]: ccat.name }));

                return cmCatClientInvocatorMethods.remove({ catw: ccat.wid });
              }}
            />
          </div>
          {isShowComs ? (
            <LoadIndicatedContent isLoading={!ccat.coms.length}>
              <ComFaceList
                list={ccat.coms}
                importantOnClick={emptyFunc}
              />
            </LoadIndicatedContent>
          ) : null}
        </>
      }
    />
  );
};
