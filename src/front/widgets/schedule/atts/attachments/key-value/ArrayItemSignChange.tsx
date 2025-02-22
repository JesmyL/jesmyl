import { StrongDiv } from '#basis/ui/strong-control/StrongDiv';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { schDayEventsSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
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

export function ScheduleKeyValueListAttArrayItemKeyChange(props: {
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
