import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { StoragesRack, StoragesRackWid } from 'shared/model/storages/list.model';

export const StoragesWithRack = (props: {
  rackw: StoragesRackWid;
  children: (rack: StoragesRack) => React.ReactNode;
}) => {
  const rack = useLiveQuery(() => storagesIDB.tb.racks.get(props.rackw), [props.rackw]);

  return <>{rack && props.children(rack)}</>;
};
