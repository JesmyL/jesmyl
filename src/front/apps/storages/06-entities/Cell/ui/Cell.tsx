import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesColumnConfigDict } from 'shared/const/storages/storagesColumnConfigDict';
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

  [StoragesColumnUiListKey.MarginTopSmall]: '-mt-2!',
  [StoragesColumnUiListKey.MarginTopBig]: 'mt-10!',
  [StoragesColumnUiListKey.MarginTopLarge]: 'mt-25!',

  [StoragesColumnUiListKey.MarginBottomSmall]: '-mb-2!',
  [StoragesColumnUiListKey.MarginBottomBig]: 'mb-10!',
  [StoragesColumnUiListKey.MarginBottomLarge]: 'mb-25!',
};

export const TheStoragesCell = (props: Props) => {
  const column = props.rack.cols[props.coli];
  const Component = storagesCellComponents[column.t];
  const isEdit = useStoragesIsEditInnersContext();
  let uiAttrs: { className?: string; style?: object } = {};

  if (!isEdit) {
    uiAttrs = {
      className: 'empty:hidden p-2 ' + (column.uil?.map(key => classNameMapsDict[key]).join(' ') ?? ''),
      style: column.uid && {
        color: column.uid.text,
        backgroundColor: column.uid.bg,
      },
    };
  }

  return (
    <div {...uiAttrs}>
      <Component
        icon={storagesColumnConfigDict[column.t].icon}
        cell={props.card.row?.[props.coli] as never}
        column={column as never}
        card={props.card}
        rack={props.rack}
        coli={props.coli}
        columnTitleNode={
          isEdit ? (
            <div>
              <span
                className="text-x7"
                storages-coli={props.coli}
                storages-col-type={props.rack.cols[props.coli].t}
              >
                #{props.coli + 1}{' '}
              </span>
              {column.title}
            </div>
          ) : (
            column.title
          )
        }
      />
    </div>
  );
};
