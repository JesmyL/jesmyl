import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';
import { StoragesColumnUiListKey } from 'shared/model/storages/ui.model';
import { storagesCellComponents } from '../const/cellComponents';

type Props = {
  card: StoragesRackCard;
  coli: number;
  rack: StoragesRack;
};

const classNameMapsDict: Record<StoragesColumnUiListKey, string> = {
  [StoragesColumnUiListKey.FontSizeSmall]: 'text-xs **:text-xs',
  [StoragesColumnUiListKey.FontSizeBig]: 'text-xl **:text-xl',
  [StoragesColumnUiListKey.FontSizeLarge]: 'text-3xl **:text-3xl',

  [StoragesColumnUiListKey.MarginTopSmall]: 'mt-2!',
  [StoragesColumnUiListKey.MarginTopBig]: 'mt-5!',
  [StoragesColumnUiListKey.MarginTopLarge]: 'mt-20!',

  [StoragesColumnUiListKey.MarginBottomSmall]: 'mb-2!',
  [StoragesColumnUiListKey.MarginBottomBig]: 'mb-5!',
  [StoragesColumnUiListKey.MarginBottomLarge]: 'mb-20!',
};

export const TheStoragesCell = (props: Props) => {
  const column = props.rack.cols[props.coli];
  const Component = storagesCellComponents[column.t];
  const isEdit = useStoragesIsEditInnersContext();
  let uiAttrs: { className?: string; style?: object } = {};

  if (!isEdit) {
    uiAttrs = {
      className: 'p-2 ' + (column.uil?.map(key => classNameMapsDict[key]).join(' ') ?? ''),
      style: column.uid && {
        color: column.uid.text,
        backgroundColor: column.uid.bg,
      },
    };
  }

  return (
    <div {...uiAttrs}>
      <Component
        cell={props.card.row?.[props.coli] as never}
        column={column}
        card={props.card}
        rack={props.rack}
        coli={props.coli}
      />
    </div>
  );
};
