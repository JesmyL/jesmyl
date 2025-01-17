import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { ReactNode, useState } from 'react';
import {
  CustomAttUseRights,
  customAttUseRights,
  customAttUseRightsTitles,
  ScheduleWidgetAppAttCustomized,
  scheduleWidgetUserRights,
} from 'shared/api';
import { ScheduleWidgetRightsCtrl } from 'shared/api/complect/schedule-widget/complect/rights-constructor';
import { itIt, itNIt } from 'shared/utils';
import { IconBookmark01StrokeRounded } from '../../../../complect/the-icon/icons/bookmark-01';
import { IconCheckmarkSquare02StrokeRounded } from '../../../../complect/the-icon/icons/checkmark-square-02';
import { IconEdit01StrokeRounded } from '../../../../complect/the-icon/icons/edit-01';
import { IconEyeStrokeRounded } from '../../../../complect/the-icon/icons/eye';
import { IconFile01StrokeRounded } from '../../../../complect/the-icon/icons/file-01';
import { IconPencilEdit01StrokeRounded } from '../../../../complect/the-icon/icons/pencil-edit-01';
import { IconPlusSignStrokeRounded } from '../../../../complect/the-icon/icons/plus-sign';
import { IconSquareStrokeRounded } from '../../../../complect/the-icon/icons/square';
import Modal from '../../../modal/Modal/Modal';
import { ModalBody } from '../../../modal/Modal/ModalBody';
import { ModalHeader } from '../../../modal/Modal/ModalHeader';
import StrongEditableField from '../../../strong-control/field/StrongEditableField';
import StrongClipboardPicker from '../../../strong-control/field/clipboard/Picker';
import IconButton from '../../../the-icon/IconButton';
import { theIconFromPack } from '../../../the-icon/TheIcon';
import { TheIconType } from '../../../the-icon/model';
import ScheduleWidgetIconChange from '../../complect/IconChange';
import ScheduleWidgetRightControlList from '../../control/RightControlList';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import ScheduleWidgetCustomAttTitles from './CustomAttTitles';
import { ScheduleWidgetCustomAttLocalImagineSelector } from './LocalImagine';

enum WhoCan {
  Read,
  Update,
  No,
}

const whoCanUnits: { action: string; rule: 'R' | 'U'; Icon: TheIconType }[] = [
  {
    action: 'видит',
    rule: 'R',
    Icon: IconEyeStrokeRounded,
  },
  {
    action: 'редактирует',
    rule: 'U',
    Icon: IconPencilEdit01StrokeRounded,
  },
];

export default function ScheduleWidgetCustomAtt(props: {
  tatt: ScheduleWidgetAppAttCustomized;
  isRedact?: boolean;
  topContent?: ReactNode;
}) {
  // const selfScope = takeStrongScopeMaker(props.scope, ' tattMi/', props.tatt.mi);
  const rights = useScheduleWidgetRightsContext();
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
  const [whoCani, setWhoCani] = useState(WhoCan.No);
  const whoCan = whoCanUnits[whoCani];
  const userR = rights.myUser?.R ?? rights.schedule.ctrl.defu;
  const myBalance = scheduleWidgetUserRights.rightsBalance(userR);
  const isCanRedact = scheduleWidgetUserRights.checkIsCan(userR, props.tatt.U);

  const [isOpenAttRedactor, setIsOpenAttRedactor] = useState<unknown>(false);

  const canReadUsers = props.tatt.Rs ?? [];
  const canUpdateUsers = props.tatt.Us ?? [];

  return (
    <>
      <div className={'margin-gap-v' + (props.isRedact ? '' : ' padding-gap bgcolor--5')}>
        {props.topContent}
        {props.isRedact ||
          (isCanRedact && (
            <div className="flex flex-end full-width">
              <IconButton
                Icon={IconPencilEdit01StrokeRounded}
                onClick={setIsOpenAttRedactor}
              />
            </div>
          ))}
        {props.isRedact && (
          <ScheduleWidgetIconChange
            icon={props.tatt.icon}
            header={<>Иконка для вложения {props.tatt.title}</>}
            onSend={async () => {}}
          />
        )}
        <StrongEditableField
          // scope={selfScope}
          // fieldName="field"
          fieldKey="title"
          value={props.tatt}
          isRedact={props.isRedact}
          isImpossibleEmptyValue
          Icon={props.isRedact ? IconBookmark01StrokeRounded : theIconFromPack(props.tatt.icon)?.StrokeRounded}
          title="Название"
          onSend={async () => {}}
        />
        <StrongEditableField
          // scope={selfScope}
          // fieldName="field"
          value={props.tatt}
          fieldKey="description"
          multiline
          isRedact={props.isRedact}
          Icon={IconFile01StrokeRounded}
          isImpossibleEmptyValue
          title="Описание вложения"
          onSend={async () => {}}
        />
        {props.tatt.title && (
          <>
            <div className="margin-big-gap-v">
              {whoCanUnits.map((whoCan, whoCani) => {
                return (
                  <IconButton
                    key={whoCan.rule}
                    Icon={whoCan.Icon}
                    className="flex-max margin-gap-v"
                    postfix={
                      <div className="full-width flex between">
                        <span className="flex flex-gap">
                          Кто {whoCan.action}
                          <span className="color--7">
                            {scheduleWidgetUserRights.rightsBalance(props.tatt[whoCan.rule]) + 1}+
                          </span>
                        </span>
                        {props.isRedact && isCanRedact && (
                          <IconButton
                            Icon={IconEdit01StrokeRounded}
                            onClick={() => setWhoCani(whoCani)}
                          />
                        )}
                      </div>
                    }
                  />
                );
              })}
            </div>

            {props.isRedact && (
              <ScheduleWidgetCustomAttLocalImagineSelector
                id={props.tatt.im}
                // scope={selfScope}
              />
            )}

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
                        <EvaSendButton
                          // scope={selfScope}
                          // fieldName="field"
                          // fieldKey="use"
                          // cud="U"
                          Icon={
                            customAttUseRights.checkIsHasIndividualRights(props.tatt.use, id)
                              ? IconCheckmarkSquare02StrokeRounded
                              : IconSquareStrokeRounded
                          }
                          className={
                            (top ? 'margin-big-gap-l ' : '') +
                            (customAttUseRights.checkIsHasIndividualRights(props.tatt.use, id) &&
                            (id !== CustomAttUseRights.Roles || (props.tatt.roles ?? 0) > 1) &&
                            (id !== CustomAttUseRights.Lists || (props.tatt.list ?? 0) > 1) &&
                            (id !== CustomAttUseRights.Titles || props.tatt.titles?.join(''))
                              ? 'color--7'
                              : '')
                          }
                          postfix={(top ? '' : 'Использовать ') + title}
                          // mapExecArgs={args => {
                          //   return {
                          //     ...args,
                          //     value: customAttUseRights.switchRights(props.tatt.use, id),
                          //   };
                          // }}
                          onSend={async () => {}}
                        />
                      )}

                    {id === CustomAttUseRights.Roles &&
                      customAttUseRights.checkIsHasIndividualRights(props.tatt.use, CustomAttUseRights.Roles) && (
                        <div className="margin-gap-v margin-big-gap-l">
                          {rights.schedule.ctrl.cats.map((cat, cati, cata) => {
                            return (
                              <EvaSendButton
                                key={cati}
                                // scope={selfScope}
                                // cud="U"
                                // fieldName="field"
                                // fieldKey="roles"
                                // fieldValue={cati}
                                Icon={
                                  ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(props.tatt.roles, cati)
                                    ? IconCheckmarkSquare02StrokeRounded
                                    : IconSquareStrokeRounded
                                }
                                className={
                                  ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(props.tatt.roles, cati)
                                    ? 'color--7'
                                    : ''
                                }
                                postfix={cat}
                                // mapExecArgs={args => {
                                //   return {
                                //     ...args,
                                //     value: ScheduleWidgetRightsCtrl.switchRights(props.tatt.roles, cati, cata.length),
                                //   };
                                // }}
                                onSend={async () => {}}
                              />
                            );
                          })}
                        </div>
                      )}
                    {id === CustomAttUseRights.Lists &&
                      customAttUseRights.checkIsHasIndividualRights(props.tatt.use, CustomAttUseRights.Lists) && (
                        <div className="margin-gap-v margin-big-gap-l">
                          {rights.schedule.lists.cats.map((cat, cati, cata) => {
                            return (
                              <EvaSendButton
                                key={cati}
                                // scope={selfScope}
                                // cud="U"
                                // fieldName="field"
                                // fieldKey="list"
                                Icon={
                                  ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(props.tatt.list, cati)
                                    ? IconCheckmarkSquare02StrokeRounded
                                    : IconSquareStrokeRounded
                                }
                                className={
                                  ScheduleWidgetRightsCtrl.checkIsHasIndividualRights(props.tatt.list, cati)
                                    ? 'color--7'
                                    : ''
                                }
                                postfix={cat.title}
                                // mapExecArgs={args => {
                                //   return {
                                //     ...args,
                                //     value: ScheduleWidgetRightsCtrl.switchRights(props.tatt.list, cati, cata.length),
                                //   };
                                // }}
                                onSend={async () => {}}
                              />
                            );
                          })}
                        </div>
                      )}
                    {id === CustomAttUseRights.CheckTitles &&
                      customAttUseRights.checkIsHasIndividualRights(props.tatt.use, CustomAttUseRights.Titles) && (
                        <div className="margin-big-gap-l">
                          {props.tatt.titles?.map((title, titlei) => {
                            // const titleScope = takeStrongScopeMaker(selfScope, ' titlei/', titlei);

                            return (
                              <StrongEditableField
                                key={titlei}
                                // scope={titleScope}
                                // fieldName=""
                                isImpossibleEmptyValue
                                value={title}
                                isRedact={props.isRedact}
                                multiline={customAttUseRights.checkIsHasIndividualRights(
                                  props.tatt.use,
                                  CustomAttUseRights.CheckTitles,
                                )}
                                onSend={async () => {}}
                              />
                            );
                          })}
                          {!props.tatt.titles?.some(itNIt) && (
                            <EvaSendButton
                              // scope={selfScope}
                              // fieldName="titles"
                              Icon={IconPlusSignStrokeRounded}
                              onSend={async () => {}}
                            />
                          )}
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
                  <div className="margin-gap-t color--4">
                    Используются:
                    <span className="color--3"> {usedLists.join(', ')}</span>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {isCanRedact && whoCani !== WhoCan.No && (
        <Modal onClose={() => setWhoCani(WhoCan.No)}>
          <ModalHeader>
            Кто {whoCan.action} вложение <span className="color--7">{props.tatt.title}</span>
          </ModalHeader>
          <ModalBody>
            <ScheduleWidgetRightControlList
              // scope={selfScope}
              // fieldName="field"
              // fieldKey={whoCan.rule}
              rightCtrl={scheduleWidgetUserRights}
              R={props.tatt[whoCan.rule]}
              isReverse
              isDisabled={type => myBalance < scheduleWidgetUserRights.rightLevel(type.id) + 2}
              onSend={async () => {}}
            />
            <h3>... или участники</h3>
            {rights.schedule.ctrl.users.map(user => {
              const isForceChecked =
                !!user.R && scheduleWidgetUserRights.checkInvertIsCan(user.R, props.tatt[whoCan.rule]);

              return (
                <EvaSendButton
                  key={user.mi}
                  // scope={selfScope}
                  // fieldName="accessList"
                  // fieldKey={`${whoCan.rule}s`}
                  // fieldValue={user.mi}
                  // cud="U"
                  className="margin-gap-v flex-max"
                  disabled={!user.R || isForceChecked}
                  postfix={user.fio}
                  Icon={
                    isForceChecked || (whoCan.rule === 'U' ? canUpdateUsers : canReadUsers).includes(user.mi)
                      ? IconCheckmarkSquare02StrokeRounded
                      : IconSquareStrokeRounded
                  }
                  onSend={async () => {}}
                />
              );
            })}
          </ModalBody>
        </Modal>
      )}

      {isCanRedact && isOpenAttRedactor && (
        <Modal onClose={setIsOpenAttRedactor}>
          <ModalHeader>
            <span className="flex flex-gap full-width between">
              <span>
                <span className="color--7">{props.tatt.title} </span>- Редактирование вложения
              </span>
              <StrongClipboardPicker />
            </span>
          </ModalHeader>
          <ModalBody>
            <ScheduleWidgetCustomAtt
              {...props}
              isRedact
            />
          </ModalBody>
        </Modal>
      )}
    </>
  );
}
