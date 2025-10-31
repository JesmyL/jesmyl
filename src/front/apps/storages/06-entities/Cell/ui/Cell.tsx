import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';
import { storagesCellComponents } from '../const/cellComponents';

type Props = {
  card: StoragesRackCard;
  coli: number;
  rack: StoragesRack;
};

export const TheStoragesCell = (props: Props) => {
  const column = props.rack.cols[props.coli];
  const Component = storagesCellComponents[column.t];

  return (
    <Component
      cell={props.card.row?.[props.coli] as never}
      column={column}
      card={props.card}
      rack={props.rack}
      coli={props.coli}
    />
  );
};
