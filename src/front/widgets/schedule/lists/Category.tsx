import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
import React, { useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import { IScheduleWidgetListCat } from 'shared/api';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { schListsTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetListUnit } from './Unit';

const LazyIconConfigurator = React.lazy(() => import('../../../shared/ui/configurators/Icon'));

const reg = makeRegExp('/([а-яё]?[йуеъыаоэяиью]+[а-яё]).+/i');
const cutTitle = (title: string) => title.replace(reg, '$1.');
const isModalOpenAtom = atom(false);

export function ScheduleWidgetListCategory({ cat, cati }: { cat: IScheduleWidgetListCat; cati: number }) {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const catScopeProps = useMemo(() => ({ ...scheduleScopeProps, cati }), [cati, scheduleScopeProps]);
  const title = <>{cat.title || <span className="italic">Список</span>}</>;
  const shortTitles: [string, string] = [cutTitle(cat.titles[0]), cutTitle(cat.titles[1])];

  return (
    <>
      <ExpandableContent
        title={
          <>
            <LazyIcon icon={cat.icon} /> {title}
          </>
        }
        postfix={isExpand =>
          isExpand &&
          rights.isCanTotalRedact && (
            <div className="flex gap-2">
              <div className="ellipsis max-w-20">{cat.title.toLowerCase()}</div>
              {!rights.schedule.lists?.units.some(unit => !unit.title) && (
                <TheIconSendButton
                  icon="PlusSign"
                  confirm={`Создать новое ${cat.title}?`}
                  onSend={() => schListsTsjrpcClient.createUnit({ props: catScopeProps, cati })}
                />
              )}
              <LazyIcon
                icon="Edit02"
                onClick={isModalOpenAtom.do.toggle}
              />
            </div>
          )
        }
      >
        {isExpand => (
          <div className="mx-5">
            {isExpand &&
              rights.schedule.lists?.units.map(unit => {
                if (unit.cati !== cati) return null;

                return (
                  <ScheduleWidgetListUnit
                    key={unit.mi}
                    cat={cat}
                    cati={cati}
                    unit={unit}
                    shortTitles={shortTitles}
                  />
                );
              })}
          </div>
        )}
      </ExpandableContent>

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader className="flex gap-2">{title}</ModalHeader>

        <ModalBody>
          <LazyIconConfigurator
            header={`Иконка для списка ${cat.title}`}
            icon={cat.icon}
            used={[cat.icon]}
            onSend={icon => schListsTsjrpcClient.setCategoryIcon({ props: catScopeProps, value: icon })}
          />
          <StrongEditableField
            icon="SchoolReportCard"
            title="Название списка"
            value={cat}
            fieldKey="title"
            isRedact
            onSend={value => schListsTsjrpcClient.setCategoryTitle({ props: catScopeProps, value })}
          />
          <StrongEditableField
            title="Заголовок руководителям"
            value={cat.titles[0]}
            isRedact
            onSend={value => schListsTsjrpcClient.setCategoryMentorsTitle({ props: catScopeProps, value })}
          />
          <StrongEditableField
            title="Заголовок участникам"
            value={cat.titles[1]}
            isRedact
            onSend={value => schListsTsjrpcClient.setCategoryMembersTitle({ props: catScopeProps, value })}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
