import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { DatePicker } from '#shared/components/DatePicker';
import { mylib } from '#shared/lib/my-lib';
import { ConditionalRender } from '#shared/ui/ConditionalRender';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useLiveQuery } from 'dexie-react-hooks';
import { storagesColumnConfigDict } from 'shared/const/storages/storagesColumnConfigDict';
import { storagesSummaryTypePropsDict, storagesSummaryTypeTitlesOrder } from 'shared/const/storages/summary.dicts';
import { StoragesRackSummaryMi, StoragesRackSummaryType, StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

const computableColTypes = new Set([StoragesColumnType.Dates, StoragesColumnType.Formula, StoragesColumnType.Number]);

export const StoragesRackSumEditModalInner = ({
  rackw,
  summaryMi,
}: {
  rackw: StoragesRackWid;
  summaryMi: StoragesRackSummaryMi;
}) => {
  const rack = useLiveQuery(() => storagesIDB.tb.racks.get(rackw), [rackw]);

  return (
    <>
      <ConditionalRender
        value={rack?.sum?.find(summary => summary.mi === summaryMi)}
        render={summary => (
          <>
            <ModalHeader>{summary.title}</ModalHeader>
            <ModalBody>
              <Dropdown
                label="Тип"
                id={summary.type}
                items={storagesSummaryTypeTitlesOrder.map(type => ({
                  id: type,
                  title: storagesSummaryTypePropsDict[type].title,
                }))}
                onSelectId={type =>
                  storagesTsjrpcClient.putAtRackSummary({ rackw, put: { type }, summaryMi: summary.mi })
                }
              />

              {summary.type === StoragesRackSummaryType.Total || (
                <DatePicker
                  initValue={summary.date * 100000}
                  className="my-5"
                  dateTitle={storagesSummaryTypePropsDict[summary.type].mapDateString(summary.date * 100000)}
                  onSelect={async date => {
                    storagesTsjrpcClient.putAtRackSummary({
                      rackw,
                      summaryMi,
                      put: { date: mylib.isNaN(date?.getTime()) ? undefined : date?.getTime() },
                    });
                  }}
                />
              )}

              <InputWithLoadingIcon
                icon="Text"
                label="Название сводки"
                defaultValue={summary.title}
                onChanged={title => storagesTsjrpcClient.putAtRackSummary({ put: { title }, rackw, summaryMi })}
              />

              <div>
                <InputWithLoadingIcon
                  icon={storagesColumnConfigDict[StoragesColumnType.Formula].icon}
                  multiline
                  label="Формула по карточке"
                  defaultValue={summary.formula}
                  onChanged={formula => storagesTsjrpcClient.putAtRackSummary({ put: { formula }, rackw, summaryMi })}
                />

                {rack?.cols.map((column, columni) => {
                  if (!computableColTypes.has(column.t)) return null;

                  return (
                    <div key={columni}>
                      <span className={column.cols ? '' : 'text-x7'}>#{columni + 1} </span>
                      {column.title}
                      {column.cols?.map((nestedColumn, nestedColumni) => {
                        return (
                          <div
                            key={nestedColumni}
                            className="ml-3"
                          >
                            <span className="text-x7">
                              #{columni + 1}.#{nestedColumni + 1}{' '}
                            </span>
                            {nestedColumn.title}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </ModalBody>
          </>
        )}
      />
    </>
  );
};
