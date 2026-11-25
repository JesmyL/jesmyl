import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { ContextMenu } from '#shared/components/ui/context-menu';
import { useConfirm } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComSelectedComwsAtom } from '$cm/entities/com';
import { useCmComFavouriteList } from '$cm/entities/com-favourite';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { CmComWid, MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

interface Props {
  onClick: (reset: null) => void;
  comWid: CmComWid;
}

export const CmComFaceContextMenu = ({ onClick, comWid }: Props) => {
  const navigate = useNavigate();
  const checkAccess = useCheckUserAccessRightsInScope();
  const { isFavourite, toggleFavourite } = useCmComFavouriteList();
  const isComMarked = isFavourite(comWid);
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);
  const confirm = useConfirm();
  const comNum = selectedComws.indexOf(comWid) + 1;
  const isCanEdit = checkAccess('cm', 'EDIT');

  return (
    <>
      {!isCanEdit || (
        <ContextMenu.Item
          onClick={() => {
            onClick(null);
            navigate({ to: '/cm/edit/coms/$comw/$tab', params: { comw: `${comWid}`, tab: 'watch' } });
          }}
        >
          <LazyIcon icon="PencilEdit02" />
          {translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.EditCom])}
        </ContextMenu.Item>
      )}

      <ContextMenu.Item
        onClick={() => {
          onClick(null);
          toggleFavourite(comWid);
        }}
      >
        <LazyIcon
          icon="Favourite"
          kind={isComMarked ? 'SolidRounded' : undefined}
        />
        {translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.MarkCom], { v: +isComMarked })}
      </ContextMenu.Item>

      <ContextMenu.Item
        onClick={() => {
          onClick(null);
          cmComSelectedComwsAtom.do.toggle(comWid);
        }}
      >
        <LazyIcon icon={comNum ? 'RemoveCircleHalfDot' : 'AddCircleHalfDot'} />
        {translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.SelectedToggle], { v: comNum })}
      </ContextMenu.Item>

      {!selectedComws.length || (
        <ContextMenu.Item
          onClick={async () => {
            if (!(await confirm(translateBase(BaseLocaleKey.ClearSelectedList)))) return;
            onClick(null);
            cmComSelectedComwsAtom.set([]);
          }}
        >
          <LazyIcon icon="CancelCircleHalfDot" />
          {translateBase(BaseLocaleKey.ClearSelectedList)}
        </ContextMenu.Item>
      )}
    </>
  );
};
