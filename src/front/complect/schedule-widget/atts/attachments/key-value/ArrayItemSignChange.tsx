import { LazyIcon } from '#shared/ui/icon';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { SendableDiv } from '#shared/ui/sendable/SendableDiv';
import { schDayEventsSokiInvocatorClient } from 'front/complect/schedule-widget/invocators/invocators.methods';
import { useState } from 'react';
import {
  CustomAttUseTaleId,
  IScheduleWidgetListUnit,
  IScheduleWidgetRole,
  IScheduleWidgetTeamGame,
  IScheduleWidgetUser,
  ScheduleDayEventAttachmentScopeProps,
} from 'shared/api';
import { KeyValueListAttNumberMember } from './KeyValueListAttNumberMember';

type Props = {
  users: IScheduleWidgetUser[];
  lists: IScheduleWidgetListUnit[] | und;
  roles: IScheduleWidgetRole[] | und;
  games: IScheduleWidgetTeamGame[] | und;
  theKey: number;
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps;
};

export const ScheduleKeyValueListAttArrayItemKeyChange = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<unknown>(false);
  const map = (id: number) => {
    return (
      <SendableDiv
        key={id}
        onSuccess={() => setIsModalOpen(false)}
        className="margin-gap-v"
        onSend={() =>
          schDayEventsSokiInvocatorClient.changeKeyValueAttachmentKey(
            null,
            props.dayEventAttScopeProps,
            props.theKey,
            id,
          )
        }
      >
        <KeyValueListAttNumberMember value={id} />
      </SendableDiv>
    );
  };

  return (
    <>
      <LazyIcon
        icon="ArrowReloadHorizontal"
        className="pointer"
        onClick={setIsModalOpen}
      />

      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          <ModalHeader>
            <KeyValueListAttNumberMember value={props.theKey} />
          </ModalHeader>
          <ModalBody>
            {props.lists?.map(item => item.mi + CustomAttUseTaleId.Lists).map(map)}
            {props.roles?.map(item => item.mi + CustomAttUseTaleId.Roles).map(map)}
            {props.users?.map(item => item.mi + CustomAttUseTaleId.Users).map(map)}
            {props.games?.map(item => item.mi + CustomAttUseTaleId.Games).map(map)}
          </ModalBody>
        </Modal>
      )}
    </>
  );
};
