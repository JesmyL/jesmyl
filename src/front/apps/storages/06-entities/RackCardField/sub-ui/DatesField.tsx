import { Button } from '#shared/components/ui/button';
import { ButtonGroup } from '#shared/components/ui/button-group';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { Modal } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { StoragesDateTimestampTitle } from '$storages/entities/DateTimestampTitle';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { StoragesDatesFieldNestedDateFieldMi, StoragesFieldType } from 'shared/model/storages/rack.model';
import { StoragesRackCardFieldTypeProps } from '../model/model';
import { StoragesRackCardFieldDatesNestedDateField } from './DatesFieldNestedDateField';

const openDateMiAtom = atom<StoragesDatesFieldNestedDateFieldMi | null>(null);

export const StoragesRackCardFieldOfTypeDates = (props: StoragesRackCardFieldTypeProps<StoragesFieldType.Dates>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit && !props.cardField?.val?.length) return;

  const todayTs = new Date().setHours(0, 0, 0, 0) / 100000;

  return (
    <div>
      <div>{props.rackField.title}</div>
      <ConditionalRender
        value={props.cardField?.val?.length}
        render={() =>
          props.cardField?.val?.map(dateField => {
            if (dateField == null) return;
            if (dateField.ts > 10000000000 && !isEdit) return;

            return (
              <div
                key={dateField.ts}
                className="my-3"
              >
                <Button onClick={() => openDateMiAtom.set(dateField.mi)}>
                  <StoragesDateTimestampTitle timestamp={dateField.ts} />
                  <LazyIcon icon="ArrowRight01" />
                </Button>
              </div>
            );
          })
        }
        else={<div className="opacity-50 text-x7">Дат нет</div>}
      />

      {isEdit && (
        <ButtonGroup.Root>
          <Button
            icon="PlusSign"
            onClick={() =>
              storagesTsjrpcClient.createRackCardDatesFieldDate({
                rackw: props.rack.w,
                fieldi: props.fieldi,
                cardMi: props.card.mi,
                timestamp: Date.now(),
              })
            }
          >
            Новая дата
          </Button>

          {props.cardField?.val.some(it => it?.ts === todayTs) || (
            <Button
              icon="PlusSign"
              onClick={() =>
                storagesTsjrpcClient.createRackCardDatesFieldDate({
                  rackw: props.rack.w,
                  fieldi: props.fieldi,
                  cardMi: props.card.mi,
                })
              }
            >
              Сегодня
            </Button>
          )}
        </ButtonGroup.Root>
      )}

      <Modal
        openAtom={openDateMiAtom}
        isRenderHere
      >
        {dateMi => (
          <StoragesRackCardFieldDatesNestedDateField
            {...props}
            dateMi={dateMi}
          />
        )}
      </Modal>
    </div>
  );
};
