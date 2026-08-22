import { translateBase } from '#basis/locale';
import { ContextMenu } from '#shared/components/ui/context-menu';
import { useConfirm } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmComSelectedComwsAtom } from '$cm/entities/com';
import { useCmComFavouriteList } from '$cm/entities/com-favourite';
import { useAtomValue } from 'atomaric';
import { CmComWid, MenuComToolName } from 'shared/api';

interface Props {
  onClick: (reset: null) => void;
  comWid: CmComWid;
}

export const CmComFaceContextMenu = ({ onClick, comWid }: Props) => {
  const { isFavourite, toggleFavourite } = useCmComFavouriteList();
  const isComMarked = isFavourite(comWid);
  const selectedComws = useAtomValue(cmComSelectedComwsAtom);
  const confirm = useConfirm();
  const comNum = selectedComws.indexOf(comWid) + 1;

  return (
    <>
      <ContextMenu.Item
        onClick={() => {
          onClick(null);
          toggleFavourite(comWid);
        }}
      >
        <LazyIcon
          icon="Star"
          kind={isComMarked ? 'SolidRounded' : undefined}
        />
        {translateBase(it => it.cm.com.tool[MenuComToolName.MarkCom], { v: +isComMarked })}
      </ContextMenu.Item>

      <ContextMenu.Item
        onClick={() => {
          onClick(null);
          cmComSelectedComwsAtom.do.toggle(comWid);
        }}
      >
        <LazyIcon icon={comNum ? 'RemoveCircleHalfDot' : 'AddCircleHalfDot'} />
        {translateBase(it => it.cm.com.tool[MenuComToolName.SelectedToggle], { v: comNum })}
      </ContextMenu.Item>

      {!selectedComws.length || (
        <ContextMenu.Item
          onClick={async () => {
            if (!(await confirm(translateBase(it => it.clearSelList)))) return;
            onClick(null);
            cmComSelectedComwsAtom.set([]);
          }}
        >
          <LazyIcon icon="CancelCircleHalfDot" />
          {translateBase(it => it.clearSelList)}
        </ContextMenu.Item>
      )}
    </>
  );
};
