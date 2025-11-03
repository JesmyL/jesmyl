import { StoragesRack } from 'shared/model/storages/list.model';
import { storagesColumnEditComponents } from '../const/columnComponents';

type Props = {
  coli: number;
  rack: StoragesRack;
};

export const TheStoragesColumnEditColumn = (props: Props) => {
  const column = props.rack.cols[props.coli];
  const Component = storagesColumnEditComponents[column.t];

  return (
    <>
      <div>{column.title}</div>
      <div>{column.t}</div>

      <Component
        column={column as never}
        rack={props.rack}
        coli={props.coli}
      />
    </>
  );
};
