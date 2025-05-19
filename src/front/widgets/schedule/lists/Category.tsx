import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
import React, { useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import { IScheduleWidgetListCat } from 'shared/api';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { schListsSokiInvocatorClient } from '../invocators/invocators.methods';
import { ScheduleWidgetListUnit } from './Unit';

const LazyIconConfigurator = React.lazy(() => import('../../../shared/ui/configurators/Icon'));

const reg = makeRegExp('/([а-яё]?[йуеъыаоэяиью]+[а-яё]).+/i');
const cutTitle = (title: string) => title.replace(reg, '$1.');
const isModalOpenAtom = atom(false);

export function ScheduleWidgetListCategory({ cat, cati }: { cat: IScheduleWidgetListCat; cati: number }) {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const catScopeProps = useMemo(() => ({ ...scheduleScopeProps, cati }), [cati, scheduleScopeProps]);
  const title = <>{cat.title || <span className="text-italic">Список</span>}</>;
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
            <div className="flex flex-gap">
              <div className="ellipsis max-width:5em">{cat.title.toLowerCase()}</div>
              {!rights.schedule.lists?.units.some(unit => !unit.title) && (
                <TheIconSendButton
                  icon="PlusSign"
                  confirm={`Создать новое ${cat.title}?`}
                  onSend={() => schListsSokiInvocatorClient.createUnit({ props: catScopeProps, cati })}
                />
              )}
              <LazyIcon
                icon="Edit02"
                onClick={isModalOpenAtom.toggle}
              />
            </div>
          )
        }
      >
        {isExpand => (
          <div className="margin-big-gap-h">
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
        <ModalHeader className="flex flex-gap">{title}</ModalHeader>

        <ModalBody>
          <LazyIconConfigurator
            header={`Иконка для списка ${cat.title}`}
            icon={cat.icon}
            used={[cat.icon]}
            onSend={icon => schListsSokiInvocatorClient.setCategoryIcon({ props: catScopeProps, value: icon })}
          />
          <StrongEditableField
            icon="SchoolReportCard"
            title="Название списка"
            value={cat}
            fieldKey="title"
            isRedact
            onSend={value => schListsSokiInvocatorClient.setCategoryTitle({ props: catScopeProps, value })}
          />
          <StrongEditableField
            title="Заголовок руководителям"
            value={cat.titles[0]}
            isRedact
            onSend={value => schListsSokiInvocatorClient.setCategoryMentorsTitle({ props: catScopeProps, value })}
          />
          <StrongEditableField
            title="Заголовок участникам"
            value={cat.titles[1]}
            isRedact
            onSend={value => schListsSokiInvocatorClient.setCategoryMembersTitle({ props: catScopeProps, value })}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
