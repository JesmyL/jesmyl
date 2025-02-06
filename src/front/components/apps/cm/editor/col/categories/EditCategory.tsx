import { useAtom } from 'front/complect/atoms';
import IconButton from 'front/complect/the-icon/IconButton';
import { IconCancel01StrokeRounded } from 'front/complect/the-icon/icons/cancel-01';
import { IconCancelCircleStrokeRounded } from 'front/complect/the-icon/icons/cancel-circle';
import { IconMapsRefreshStrokeRounded } from 'front/complect/the-icon/icons/maps-refresh';
import { IconTextFontStrokeRounded } from 'front/complect/the-icon/icons/text-font';
import { mylib } from 'front/utils';
import { useState } from 'react';
import Dropdown from '../../../../../../complect/dropdown/Dropdown';
import LoadIndicatedContent from '../../../../../../complect/load-indicated-content/LoadIndicatedContent';
import { InputWithLoadingIcon } from '../../../base/InputWithLoadingIcon';
import { catTrackers } from '../../../col/cat/Cat.complect';
import { useCcatw } from '../../../col/cat/useCcat';
import { ComFaceList } from '../../../col/com/face/list/ComFaceList';
import { cmCatClientInvocatorMethods } from '../../cm-editor-invocator.methods';
import PhaseCmEditorContainer from '../../phase-editor-container/PhaseCmEditorContainer';
import { removedCategoriesAtom } from './atoms';
import { useEditableCcat } from './useEditableCcat';

export default function EditCategory() {
  const [removedCats, setRemovedCats] = useAtom(removedCategoriesAtom);
  const ccatw = useCcatw();
  const ccat = useEditableCcat();
  const [isShowComs, setIsShowComs] = useState(false);

  if (!ccat) {
    if (mylib.isNaN(ccatw) || removedCats[ccatw] == null) return null;

    return (
      <PhaseCmEditorContainer
        className="edit-category"
        headTitle={`Категория - ${removedCats[ccatw]}`}
        content={
          <div className="flex column">
            <h2 className="color--ko">Категория удалена</h2>
            <IconButton
              Icon={IconMapsRefreshStrokeRounded}
              postfix="Восстановить"
              className="color--ok"
              onClick={() => cmCatClientInvocatorMethods.bringBackToLife(null, ccatw)}
            />
          </div>
        }
      />
    );
  }

  return (
    <PhaseCmEditorContainer
      className="edit-category"
      headTitle={`Категория - ${ccat.initialName}`}
      content={
        <>
          <InputWithLoadingIcon
            Icon={IconTextFontStrokeRounded}
            defaultValue={ccat.name}
            label="Название"
            onChange={value => cmCatClientInvocatorMethods.rename(null, ccat.wid, value)}
          />

          <div className="flex between">
            <span>Тип:</span>
            <div className="half-width">
              <Dropdown
                id={ccat.kind}
                items={catTrackers}
                onSelect={kind => {
                  cmCatClientInvocatorMethods.setKind(null, ccat.wid, kind.id);
                }}
              />
            </div>
            {ccat.kind !== 'list' && ccat.coms.length > 0 && (
              <IconButton
                Icon={IconCancel01StrokeRounded}
                postfix="Очистить список"
                confirm="Список восстановить не получится"
                onClick={() => cmCatClientInvocatorMethods.clearStack(null, ccat.wid)}
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
            <IconButton
              Icon={IconCancelCircleStrokeRounded}
              className="color--ko"
              postfix="Удалить категорию"
              confirm
              onClick={() => {
                setRemovedCats(prev => ({ ...prev, [ccat.wid]: ccat.name }));

                return cmCatClientInvocatorMethods.remove(null, ccat.wid);
              }}
            />
          </div>
          {isShowComs ? (
            <LoadIndicatedContent isLoading={!ccat.coms.length}>
              <ComFaceList
                list={ccat.coms}
                importantOnClick={() => {}}
              />
            </LoadIndicatedContent>
          ) : null}
        </>
      }
    />
  );
}
