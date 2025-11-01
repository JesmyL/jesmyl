import IconConfigurator from '#shared/ui/configurators/Icon';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { StoragesRack, StoragesRackWid } from 'shared/model/storages/list.model';

const colorChangeAtom = atom({ color: '', rackw: StoragesRackWid.def, statusi: -1 });

colorChangeAtom.subscribe(props => {
  storagesTsjrpcClient.editRackStatusColor(props);
});

export const StoragesRackStatusEditModalInner = ({ rack, statusi }: { statusi: number; rack: StoragesRack }) => {
  const rackStatus = rack.statuses[statusi];
  const rackw = rack.w;

  return (
    <>
      <ModalHeader>
        <StoragesRackStatusFace
          rack={rack}
          card={null}
          statusi={statusi}
        />
      </ModalHeader>
      <ModalBody>
        <TextInput
          label="Название"
          defaultValue={rackStatus.title}
          onChanged={title => storagesTsjrpcClient.editRackStatusTitle({ rackw, statusi, title })}
        />

        <div className="flex gap-3 my-3">
          <span>Цвет</span>
          <input
            type="color"
            value={rackStatus.color || '#fff'}
            onChange={event => colorChangeAtom.setDeferred({ color: event.target.value, rackw, statusi })}
          />
        </div>

        <IconConfigurator
          icon={rackStatus.icon ?? 'Cube'}
          iconNode={
            <LazyIcon
              icon={rackStatus.icon ?? 'Cube'}
              style={{ color: rackStatus.color }}
            />
          }
          header={
            <span>
              Иконка для статуса <span className="text-x7">{rackStatus.title}</span>
            </span>
          }
          onSend={icon => storagesTsjrpcClient.editRackStatusIcon({ icon, rackw, statusi })}
        />

        <div className="text-sm my-5">
          Статусы, которые можно выбрать когда <span className="text-x7">{rackStatus.title}</span> - текущий
        </div>
        {rack.statuses.map((nextStatus, nextStatusi) => {
          if (nextStatusi === statusi) return;

          return (
            <IconCheckbox
              key={nextStatusi}
              checked={rack.statuses.length < 2 || !rackStatus.next || rackStatus.next.includes(nextStatusi)}
              disabled={rack.statuses.length < 2}
              postfix={nextStatus.title}
              onClick={() => storagesTsjrpcClient.toggleRackStatusNexti({ nextStatusi, rackw, statusi })}
            />
          );
        })}
      </ModalBody>
    </>
  );
};
