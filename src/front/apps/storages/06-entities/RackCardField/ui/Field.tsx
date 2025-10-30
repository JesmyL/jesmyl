import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';
import { storagesRackCardFieldComponents } from '../const/cardFieldComponents';

type Props = {
  card: StoragesRackCard;
  fieldi: number;
  rack: StoragesRack;
};

export const TheStoragesRackCardField = (props: Props) => {
  const rackField = props.rack.fields[props.fieldi];
  const Component = storagesRackCardFieldComponents[rackField.t];

  return (
    <Component
      cardField={props.card.fields?.[props.fieldi] as never}
      rackField={rackField}
      card={props.card}
      rack={props.rack}
      fieldi={props.fieldi}
    />
  );
};
