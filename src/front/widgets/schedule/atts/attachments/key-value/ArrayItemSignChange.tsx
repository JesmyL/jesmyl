import { StrongDiv } from '#basis/ui/strong-control/StrongDiv';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { atom } from 'atomaric';
import {
  CustomAttUseTaleId,
  IScheduleWidgetListUnit,
  IScheduleWidgetRole,
  IScheduleWidgetTeamGame,
  IScheduleWidgetUser,
  ScheduleDayEventAttachmentScopeProps,
} from 'shared/api';
import { KeyValueListAttNumberMember } from './KeyValueListAttNumberMember';

const isModalOpenAtom = atom(false);

export function ScheduleKeyValueListAttArrayItemKeyChange(props: {
  users: IScheduleWidgetUser[];
  lists: IScheduleWidgetListUnit[] | und;
  roles: IScheduleWidgetRole[] | und;
  games: IScheduleWidgetTeamGame[] | und;
  theKey: number;
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps;
}) {
  const map = (id: number) => {
    return (
      <StrongDiv
        key={id}
        onSuccess={() => isModalOpenAtom.set(false)}
        className="margin-gap-v"
        onSend={() =>
          schDayEventsTsjrpcClient.changeKeyValueAttachmentKey({
            props: props.dayEventAttScopeProps,
            key: props.theKey,
            value: id,
          })
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
        onClick={isModalOpenAtom.toggle}
      />

      <Modal openAtom={isModalOpenAtom}>
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
    </>
  );
}
