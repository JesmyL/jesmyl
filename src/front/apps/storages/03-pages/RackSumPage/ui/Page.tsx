import { Accordion } from '#shared/components/ui/accordion';
import { Button } from '#shared/components/ui/button';
import { Modal, usePrompt } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { Atom, atom } from 'atomaric';
import { useLiveQuery } from 'dexie-react-hooks';
import { storagesSummaryTypePropsDict } from 'shared/const/storages/summary.dicts';
import { StoragesRackSummaryMi, StoragesRackWid } from 'shared/model/storages/list.model';
import { storagesRackSumComputeFormulas } from '../lib/computeFormulas';
import { StoragesRackSumEditModalInner } from './EditModalInner';

let summaryEditMiAtom: Atom<null | StoragesRackSummaryMi>;

export const StoragesRackSumPage = ({ rackw }: { rackw: StoragesRackWid }) => {
  summaryEditMiAtom ??= atom<null | StoragesRackSummaryMi>(null);

  const rack = useLiveQuery(() => storagesIDB.tb.racks.get(rackw), [rackw]);
  const prompt = usePrompt();

  return (
    <PageContainerConfigurer
      className="StoragesRackEditPage"
      headTitle={
        <>
          Сводки <span className="text-x7">{rack?.title}</span>
        </>
      }
      head={
        <Button
          icon="PlusSign"
          onClick={async () => {
            const title = await prompt('Название свлдки');
            if (!title) return;
            return storagesTsjrpcClient.addRackSummary({ rackw, title });
          }}
        />
      }
      content={
        <>
          <Accordion.Root type="multiple">
            {rack?.sum?.map((summary, summaryi) => {
              const dateTitle = storagesSummaryTypePropsDict[summary.type].mapDateString(summary.date * 100000);

              return (
                <Accordion.Item
                  key={summary.mi}
                  value={'' + summaryi}
                >
                  <Accordion.Trigger>
                    <div className="flex gap-5">
                      {summary.title}
                      {dateTitle && <> ({dateTitle})</>}
                    </div>
                  </Accordion.Trigger>
                  <Accordion.Content className="flex justify-between">
                    <div>
                      <div>Тип: {storagesSummaryTypePropsDict[summary.type].title}</div>
                      <div>Итог: {storagesRackSumComputeFormulas(summary, rack)}</div>
                    </div>
                    <Button
                      asSpan
                      icon="Edit02"
                      className="mt-5"
                      onClick={() => summaryEditMiAtom.set(summary.mi)}
                    />
                  </Accordion.Content>
                </Accordion.Item>
              );
            })}
          </Accordion.Root>

          <Modal openAtom={summaryEditMiAtom}>
            {summaryMi => (
              <StoragesRackSumEditModalInner
                rackw={rackw}
                summaryMi={summaryMi}
              />
            )}
          </Modal>
        </>
      }
    />
  );
};
