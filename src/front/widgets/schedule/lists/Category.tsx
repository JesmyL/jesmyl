import { translateBase } from '#basis/locale';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Atom, atom } from 'atomaric';
import React, { useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import { IScheduleWidgetListCat } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ruLowerLettersStr } from 'shared/utils/cm/com/const';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { schListsTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetListUnit } from './Unit';

const LazyIconConfigurator = React.lazy(() => import('../../../shared/ui/configurators/Icon'));

const reg = makeRegExp(`/([${ruLowerLettersStr}]?[йуеъыаоэяиью]+[${ruLowerLettersStr}]).+/i`);
const cutTitle = (title: string) => title.replace(reg, '$1.');

let isModalOpenAtom: Atom<boolean>;

export function ScheduleWidgetListCategory({ cat, cati }: { cat: IScheduleWidgetListCat; cati: number }) {
  isModalOpenAtom ??= atom(false);

  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const catScopeProps = useMemo(() => ({ ...scheduleScopeProps, cati }), [cati, scheduleScopeProps]);
  const title = (
    <>{cat.title || <span className="italic">{translateBase(BaseLocaleKey.ScheduleList)}</span>}</>
  );
  const shortTitles: [string, string] = [cutTitle(cat.titles[0]), cutTitle(cat.titles[1])];

  return (
    <>
      <div
        className="sch-lists-card rounded-2xl border border-x4/30 bg-x2/60 p-3 mb-3 shadow-[0_18px_40px_-30px_rgb(0_0_0_/_0.7)] backdrop-blur-sm transition-colors hover:border-xOK/40"
        style={{ animationDelay: `${cati * 45}ms` }}
      >
        <ExpandableContent
          title={
            <span className="flex items-center gap-2">
              <span className="grid place-items-center size-8 rounded-xl bg-x4/15 text-x3">
                <LazyIcon icon={cat.icon} />
              </span>
              <span className="text-base font-extrabold tracking-tight">{title}</span>
            </span>
          }
          postfix={isExpand =>
            isExpand &&
            rights.isCanTotalRedact && (
              <div className="flex gap-2 text-xs text-x7">
                <div className="ellipsis max-w-20">{cat.title.toLowerCase()}</div>
                {!rights.schedule.lists?.units.some(unit => !unit.title) && (
                  <TheIconSendButton
                    icon="PlusSign"
                    confirm={translateBase(BaseLocaleKey.ScheduleCreateNewX, { t: cat.title })}
                    onSend={() => schListsTsjrpcClient.createUnit({ props: catScopeProps, cati })}
                  />
                )}
                <LazyIcon
                  icon="Edit02"
                  className="pointer"
                  onClick={isModalOpenAtom.do.toggle}
                />
              </div>
            )
          }
        >
          {isExpand => (
            <div className="mx-2 mt-2">
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
      </div>

      <Modal openAtom={isModalOpenAtom}>
        <ModalHeader className="flex gap-2">{title}</ModalHeader>

        <ModalBody>
          <LazyIconConfigurator
            header={translateBase(BaseLocaleKey.ScheduleListIcon, { t: cat.title })}
            icon={cat.icon}
            used={[cat.icon]}
            onSend={icon => schListsTsjrpcClient.setCategoryIcon({ props: catScopeProps, value: icon })}
          />
          <StrongEditableField
            icon="SchoolReportCard"
            title={translateBase(BaseLocaleKey.ScheduleListName)}
            value={cat}
            fieldKey="title"
            isRedact
            onSend={value => schListsTsjrpcClient.setCategoryTitle({ props: catScopeProps, value })}
          />
          <StrongEditableField
            title={translateBase(BaseLocaleKey.ScheduleMentorsTitle)}
            value={cat.titles[0]}
            isRedact
            onSend={value => schListsTsjrpcClient.setCategoryMentorsTitle({ props: catScopeProps, value })}
          />
          <StrongEditableField
            title={translateBase(BaseLocaleKey.ScheduleMembersTitle)}
            value={cat.titles[1]}
            isRedact
            onSend={value => schListsTsjrpcClient.setCategoryMembersTitle({ props: catScopeProps, value })}
          />
        </ModalBody>
      </Modal>
    </>
  );
}
