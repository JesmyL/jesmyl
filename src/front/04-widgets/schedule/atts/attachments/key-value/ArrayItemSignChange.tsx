import { schDayEventsSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import StrongDiv from '#widgets/schedule/strong-control/StrongDiv';
import { LazyIcon } from 'front/08-shared/ui/the-icon/LazyIcon';
import { useState } from 'react';
import {
  CustomAttUseTaleId,
  IScheduleWidgetListUnit,
  IScheduleWidgetRole,
  IScheduleWidgetTeamGame,
  IScheduleWidgetUser,
  ScheduleDayEventAttachmentScopeProps,
} from 'shared/api';
import KeyValueListAttNumberMember from './KeyValueListAttNumberMember';

export default function ScheduleKeyValueListAttArrayItemKeyChange(props: {
  users: IScheduleWidgetUser[];
  lists: IScheduleWidgetListUnit[] | und;
  roles: IScheduleWidgetRole[] | und;
  games: IScheduleWidgetTeamGame[] | und;
  theKey: number;
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps;
}) {
  const [isModalOpen, setIsModalOpen] = useState<unknown>(false);
  const map = (id: number) => {
    return (
      <StrongDiv
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
      </StrongDiv>
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
}
