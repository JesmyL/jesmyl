import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { TextInput } from '#shared/ui/TextInput';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useLiveQuery } from 'dexie-react-hooks';
import { StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesRackEditColumnsRedactor } from './ColumnsRedactor';
import { StoragesRackEditParentRackSelector } from './ParentRackSelector';

export const StoragesRackEditPage = ({ rackw }: { rackw: StoragesRackWid }) => {
  const rack = useLiveQuery(() => storagesIDB.tb.racks.get(rackw), [rackw]);

  return (
    <PageContainerConfigurer
      className="StoragesRackEditPage"
      headTitle={
        <>
          Редактирование - <span className="text-x7">{rack?.title}</span>
        </>
      }
      content={
        rack && (
          <>
            <TextInput
              defaultValue={rack.title}
              strongDefaultValue
              label="Название стеллажа"
              onChanged={title => storagesTsjrpcClient.renameRack({ rackw, title })}
            />

            {(rack.statuses.length < 2 || rack.parent != null) && <StoragesRackEditParentRackSelector rack={rack} />}

            {rack.parent == null && <StoragesRackEditColumnsRedactor rack={rack} />}
          </>
        )
      }
    />
  );
};
