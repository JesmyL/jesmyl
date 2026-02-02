import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { ScheduleWidgetRightControlList } from '#widgets/schedule/control/RightControlList';
import { schAttachmentTypesTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { Atom, atom, useAtomValue } from 'atomaric';
import React, { ReactNode, useMemo } from 'react';
import {
  CustomAttUseRights,
  IScheduleWidgetAttachmentTypeMi,
  ScheduleAttachmentTypeScopeProps,
  ScheduleWidgetAppAttCustomized,
  ScheduleWidgetRightsCtrl,
  customAttUseRights,
  customAttUseRightsTitles,
  scheduleWidgetUserRights,
} from 'shared/api';
import { itIt, itNIt } from 'shared/utils';
import { twMerge } from 'tailwind-merge';
import { ScheduleWidgetCustomAttTitles } from './CustomAttTitles';
import { ScheduleWidgetCustomAttLocalImagineSelector } from './LocalImagine';

const LazyIconConfigurator = React.lazy(() => import('../../../../shared/ui/configurators/Icon'));

enum WhoCan {
  Read,
  Update,
  No,
}

const whoCanUnits: { action: string; rule: 'R' | 'U'; icon: KnownStameskaIconName }[] = [
  {
    action: 'видит',
    rule: 'R',
    icon: 'Eye',
  },
  {
    action: 'редактирует',
    rule: 'U',
    icon: 'PencilEdit01',
  },
];

let whoCaniAtom: Atom<WhoCan>;
let openAttRedactorAtom: Atom<IScheduleWidgetAttachmentTypeMi | null>;

export function ScheduleWidgetCustomAtt(props: {
  tatt: ScheduleWidgetAppAttCustomized;
  isRedact?: boolean;
  topContent?: ReactNode;
}) {
  whoCaniAtom ??= atom<WhoCan>(WhoCan.No);
  openAttRedactorAtom ??= atom<IScheduleWidgetAttachmentTypeMi | null>(null);

  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const attachmentTypeScopeProps: ScheduleAttachmentTypeScopeProps = useMemo(
    () => ({ ...scheduleScopeProps, tattMi: props.tatt.mi }),
    [props.tatt.mi, scheduleScopeProps],
  );
  const usedLists = customAttUseRightsTitles
    .map(({ title, id, top }, _, arr) => {
      const child = arr.find(({ top }) => top === id);
      if (child && customAttUseRights.checkIsHasIndividualRights(props.tatt.use, child.id)) return false;
      const parent = top == null ? undefined : arr.find(({ id }) => top === id);

      return (
        (!parent || customAttUseRights.checkIsHasIndividualRights(props.tatt.use, parent.id)) &&
        customAttUseRights.checkIsHasIndividualRights(props.tatt.use, id) &&
        title
      );
    })
    .filter(itIt);

  const whoCani = useAtomValue(whoCaniAtom);
  const whoCan = whoCanUnits[whoCani];
  const userR = rights.myUser?.R ?? rights.schedule.ctrl.defu;
  const myBalance = scheduleWidgetUserRights.rightsBalance(userR);
  const isCanRedact = scheduleWidgetUserRights.checkIsCan(userR, props.tatt.U);

  const canReadUsers = props.tatt.Rs ?? [];
  const canUpdateUsers = props.tatt.Us ?? [];

  return (
    <>
      <div className={twMerge('my-2', props.isRedact ? null : 'p-2 bg-x5')}>
        {props.topContent}
        {!props.isRedact && isCanRedact && (
          <div className="flex flex-end w-full">
            <LazyIcon
              className="pointer"
              icon="PencilEdit01"
              onClick={() => openAttRedactorAtom.set(props.tatt.mi)}
            />
          </div>
        )}
        {props.isRedact && (
          <LazyIconConfigurator
            icon={props.tatt.icon}
            header={<>Иконка для вложения {props.tatt.title}</>}
            onSend={icon =>
              schAttachmentTypesTsjrpcClient.setIcon({
                props: attachmentTypeScopeProps,
                value: icon,
                tattTitle: props.tatt.title,
              })
            }
          />
        )}
        <StrongEditableField
          fieldKey="title"
          value={props.tatt}
          isRedact={props.isRedact}
          isImpossibleEmptyValue
          icon={props.isRedact ? 'Bookmark01' : props.tatt.icon}
          title="Название"
          onSend={value =>
            schAttachmentTypesTsjrpcClient.setTitle({
              props: attachmentTypeScopeProps,
              value: value,
              prevTitle: props.tatt.title,
            })
          }
        />
        <StrongEditableField
          value={props.tatt}
          fieldKey="description"
          multiline
          isRedact={props.isRedact}
          icon="File01"
          isImpossibleEmptyValue
          title="Описание вложения"
          onSend={value =>
            schAttachmentTypesTsjrpcClient.setDescription({
              props: attachmentTypeScopeProps,
              value: value,
              tattTitle: props.tatt.title,
            })
          }
        />
        {props.tatt.title && (
          <>
            <div className="my-5">
              {whoCanUnits.map((whoCan, whoCani) => {
                return (
                  <TheIconButton
                    key={whoCan.rule}
                    icon={whoCan.icon}
                    className="flex-max my-2"
                    postfix={
                      <div className="w-full flex between">
                        <span className="flex gap-2">
                          Кто {whoCan.action}
                          <span className="text-x7">
                            {scheduleWidgetUserRights.rightsBalance(props.tatt[whoCan.rule]) + 1}+
                          </span>
                        </span>
                        {props.isRedact && isCanRedact && (
                          <LazyIcon
                            className="pointer"
                            icon="Edit01"
                            onClick={() => whoCaniAtom.set(whoCani)}
                          />
                        )}
                      </div>
                    }
                  />
                );
              })}
            </div>

            {props.isRedact && <ScheduleWidgetCustomAttLocalImagineSelector id={props.tatt.im} />}

            {props.isRedact && !props.tatt.im ? (
              customAttUseRightsTitles.map(({ title, id, top }) => {
                return (
                  <div key={id}>
                    {(id !== CustomAttUseRights.CheckTitles ||
                      customAttUseRights.checkIsHasIndividualRights(props.tatt.use, CustomAttUseRights.Titles)) &&
                      (id !== CustomAttUseRights.CheckGames ||
                        customAttUseRights.checkIsHasIndividualRights(props.tatt.use, CustomAttUseRights.Games)) &&
                      (id !== CustomAttUseRights.CheckUsers ||
                        customAttUseRights.checkIsHasIndividualRights(props.tatt.use, CustomAttUseRights.Users)) && (
                        <TheIconSendButton
                          icon={
                            customAttUseRights.checkIsHasIndividualRights(props.tatt.use, id)
                              ? 'CheckmarkSquare02'
                              : 'Square'
                          }
                          className={
                            (top ? 'ml-5 ' : '') +
                            (customAttUseRights.checkIsHasIndividualRights(props.tatt.use, id) &&
                            (id !== CustomAttUseRights.Roles || (props.tatt.roles ?? 0) > 1) &&
                            (id !== CustomAttUseRights.Lists || (props.tatt.list ?? 0) > 1) &&
                            (id !== CustomAttUseRights.Titles || props.tatt.titles?.join(''))
                              ? 'text-x7'
                              : '')
                          }
                          postfix={(top ? '' : 'Использовать ') + title}
                          onSend={() =>
                            schAttachmentTypesTsjrpcClient.setUse({
                              props: attachmentTypeScopeProps,
                              value: customAttUseRights.switchRights(props.tatt.use, id),
                              tattTitle: props.tatt.title,
                            })
                          }
                        />
                      )}

                    {id === CustomAttUseRights.Roles &&
                      customAttUseRights.checkIsHasIndividualRights(props.tatt.use, CustomAttUseRights.Roles) && (
                        <div className="my-2 ml-5">
                          {rights.schedule.ctrl.cats.map((cat, cati, cata) => {
                            if (!cat) return null;

                            return (
                              <TheIconSendButton
                                key={cati}
                                icon={
                                  ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(props.tatt.roles, cati)
                                    ? 'CheckmarkSquare02'
                                    : 'Square'
                                }
                                className={
                                  ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(props.tatt.roles, cati)
                                    ? 'text-x7'
                                    : ''
                                }
                                postfix={cat}
                                onSend={() =>
                                  schAttachmentTypesTsjrpcClient.setRolesUses({
                                    props: attachmentTypeScopeProps,
                                    value: ScheduleWidgetRightsCtrl.switchRights(props.tatt.roles, cati, cata.length),
                                    tattTitle: props.tatt.title,
                                  })
                                }
                              />
                            );
                          })}
                        </div>
                      )}
                    {id === CustomAttUseRights.Lists &&
                      customAttUseRights.checkIsHasIndividualRights(props.tatt.use, CustomAttUseRights.Lists) && (
                        <div className="my-2 ml-5">
                          {rights.schedule.lists.cats.map((cat, cati, cata) => {
                            return (
                              <TheIconSendButton
                                key={cati}
                                icon={
                                  ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(props.tatt.list, cati)
                                    ? 'CheckmarkSquare02'
                                    : 'Square'
                                }
                                disabled={!cat.title}
                                disabledReason="Название пустое"
                                className={
                                  ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(props.tatt.list, cati)
                                    ? 'text-x7'
                                    : ''
                                }
                                postfix={cat.title}
                                onSend={() =>
                                  schAttachmentTypesTsjrpcClient.setListsUses({
                                    props: attachmentTypeScopeProps,
                                    value: ScheduleWidgetRightsCtrl.switchRights(props.tatt.list, cati, cata.length),
                                    tattTitle: props.tatt.title,
                                  })
                                }
                              />
                            );
                          })}
                        </div>
                      )}
                    {id === CustomAttUseRights.CheckTitles &&
                      customAttUseRights.checkIsHasIndividualRights(props.tatt.use, CustomAttUseRights.Titles) && (
                        <div className="ml-5">
                          {props.tatt.titles?.map((title, titlei) => {
                            return (
                              <StrongEditableField
                                key={titlei}
                                isImpossibleEmptyValue
                                value={title}
                                isRedact={props.isRedact}
                                multiline={customAttUseRights.checkIsHasIndividualRights(
                                  props.tatt.use,
                                  CustomAttUseRights.CheckTitles,
                                )}
                                onSend={value =>
                                  schAttachmentTypesTsjrpcClient.setTitleValue({
                                    props: attachmentTypeScopeProps,
                                    titlei: titlei,
                                    value: value,
                                    tattTitle: props.tatt.title,
                                    prevTitle: title,
                                  })
                                }
                              />
                            );
                          })}

                          <TheIconSendButton
                            icon="PlusSign"
                            disabled={props.tatt.titles?.some(itNIt)}
                            disabledReason="Есть пустые заголовки"
                            onSend={() =>
                              schAttachmentTypesTsjrpcClient.createTitleValue({
                                props: attachmentTypeScopeProps,
                                tattTitle: props.tatt.title,
                                titlesCount: props.tatt.titles?.length ?? 0,
                              })
                            }
                          />
                        </div>
                      )}
                  </div>
                );
              })
            ) : (
              <>
                {customAttUseRights.checkIsHasIndividualRights(props.tatt.use, CustomAttUseRights.Titles) && (
                  <ScheduleWidgetCustomAttTitles tatt={props.tatt} />
                )}
                {!usedLists.length || (
                  <div className="mt-2 text-x4">
                    Используются:
                    <span className="text-x3"> {usedLists.join(', ')}</span>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {isCanRedact && whoCan && (
        <Modal
          openAtom={whoCaniAtom}
          checkIsOpen={whoCani => whoCani !== WhoCan.No}
        >
          <ModalHeader>
            Кто {whoCan.action} вложение <span className="text-x7">{props.tatt.title}</span>
          </ModalHeader>
          <ModalBody>
            <ScheduleWidgetRightControlList
              rightCtrl={scheduleWidgetUserRights}
              R={props.tatt[whoCan.rule]}
              isReverse
              isDisabled={type => myBalance < scheduleWidgetUserRights.rightLevel(type.id) + 2}
              onSend={value =>
                schAttachmentTypesTsjrpcClient.setWhoCanLevel({
                  props: attachmentTypeScopeProps,
                  rule: whoCan.rule,
                  value: value,
                  tattTitle: props.tatt.title,
                })
              }
            />
            <h3>... или участники</h3>
            {rights.schedule.ctrl.users.map(user => {
              const isForceChecked =
                !!user.R && scheduleWidgetUserRights.checkInvertIsCan(user.R, props.tatt[whoCan.rule]);

              return (
                <TheIconSendButton
                  key={user.mi}
                  className="my-2 flex-max"
                  disabled={!user.R || isForceChecked}
                  postfix={user.fio}
                  icon={
                    isForceChecked || (whoCan.rule === 'U' ? canUpdateUsers : canReadUsers).includes(user.mi)
                      ? 'CheckmarkSquare02'
                      : 'Square'
                  }
                  onSend={() =>
                    schAttachmentTypesTsjrpcClient.toggleUserWhoCan({
                      props: attachmentTypeScopeProps,
                      rule: `${whoCan.rule}s`,
                      userMi: user.mi,
                      tattTitle: props.tatt.title,
                      userName: user.fio ?? user.nick ?? '??',
                    })
                  }
                />
              );
            })}
          </ModalBody>
        </Modal>
      )}

      {isCanRedact && !props.isRedact && (
        <Modal
          openAtom={openAttRedactorAtom}
          checkIsOpen={openTatt => openTatt === props.tatt.mi}
        >
          <ModalHeader>
            <span className="flex gap-2 w-full between">
              <span>
                <span className="text-x7">{props.tatt.title} </span>- Редактирование вложения
              </span>
            </span>
          </ModalHeader>
          <ModalBody>
            <ScheduleWidgetCustomAtt
              {...props}
              tatt={props.tatt}
              isRedact
            />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
