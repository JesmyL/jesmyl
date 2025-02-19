import TheIconSendButton from 'front/complect/sends/the-icon-send-button/TheIconSendButton';
import React, { useMemo } from 'react';
import { IScheduleWidgetListCat } from 'shared/api';
import { makeRegExp } from 'shared/utils';
import { ExpandableContent } from '../../expand/ExpandableContent';
import useModal from '../../modal/useModal';
import StrongEditableField from '../../strong-control/field/StrongEditableField';
import { LazyIcon } from '../../the-icon/LazyIcon';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import { schListsSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import ScheduleWidgetListUnit from './Unit';

const LazyIconConfigurator = React.lazy(() => import('../../configurators/Icon'));

const reg = makeRegExp('/([а-яё]?[йуеъыаоэяиью]+[а-яё]).+/i');
const cutTitle = (title: string) => title.replace(reg, '$1.');

export function ScheduleWidgetListCategory({ cat, cati }: { cat: IScheduleWidgetListCat; cati: number }) {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const catScopeProps = useMemo(() => ({ ...scheduleScopeProps, cati }), [cati, scheduleScopeProps]);
  const title = <>{cat.title || <span className="text-italic">Список</span>}</>;
  const shortTitles: [string, string] = [cutTitle(cat.titles[0]), cutTitle(cat.titles[1])];

  const [modalNode, screen] = useModal(({ header, body }) => {
    return (
      <>
        {header(<div className="flex flex-gap">{title}</div>)}
        {body(
          <>
            <LazyIconConfigurator
              header={`Иконка для списка ${cat.title}`}
              icon={cat.icon}
              used={[cat.icon]}
              onSend={icon => schListsSokiInvocatorClient.setCategoryIcon(null, catScopeProps, icon)}
            />
            <StrongEditableField
              icon="SchoolReportCard"
              title="Название списка"
              value={cat}
              fieldKey="title"
              isRedact
              onSend={value => schListsSokiInvocatorClient.setCategoryTitle(null, catScopeProps, value)}
            />
            <StrongEditableField
              title="Заголовок руководителям"
              value={cat.titles[0]}
              isRedact
              onSend={value => schListsSokiInvocatorClient.setCategoryMentorsTitle(null, catScopeProps, value)}
            />
            <StrongEditableField
              title="Заголовок участникам"
              value={cat.titles[1]}
              isRedact
              onSend={value => schListsSokiInvocatorClient.setCategoryMembersTitle(null, catScopeProps, value)}
            />
          </>,
        )}
      </>
    );
  });

  return (
    <>
      {modalNode}
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
                  onSend={() => schListsSokiInvocatorClient.createUnit(null, catScopeProps, cati)}
                />
              )}
              <LazyIcon
                icon="Edit02"
                onClick={screen}
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
    </>
  );
}
