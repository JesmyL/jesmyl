import { IconArrowReloadHorizontalStrokeRounded } from '../../../../../complect/the-icon/icons/arrow-reload-horizontal';

import {
  CustomAttUseTaleId,
  IScheduleWidgetListUnit,
  IScheduleWidgetRole,
  IScheduleWidgetTeamGame,
  IScheduleWidgetUser,
} from 'shared/api';
import useModal from '../../../../modal/useModal';
import StrongDiv from '../../../../strong-control/StrongDiv';
import IconButton from '../../../../the-icon/IconButton';
import KeyValueListAttNumberMember from './KeyValueListAttNumberMember';

export default function ScheduleKeyValueListAttArrayItemKeyChange(props: {
  scope: string;
  users: IScheduleWidgetUser[];
  lists: IScheduleWidgetListUnit[] | und;
  roles: IScheduleWidgetRole[] | und;
  games: IScheduleWidgetTeamGame[] | und;
  theKey: number;
}) {
  const [modalNode, openModal] = useModal(({ header, body }, closeModal) => {
    const map = (id: number) => {
      return (
        <StrongDiv
          key={id}
          // scope={props.scope}
          // fieldName="key"
          // fieldValue={id}
          // cud="U"
          onSuccess={closeModal}
          className="margin-gap-v"
          onSend={async () => {}}
        >
          <KeyValueListAttNumberMember value={id} />
        </StrongDiv>
      );
    };
    return (
      <>
        {header(<KeyValueListAttNumberMember value={props.theKey} />)}
        {body(
          <>
            {props.lists?.map(item => item.mi + CustomAttUseTaleId.Lists).map(map)}
            {props.roles?.map(item => item.mi + CustomAttUseTaleId.Roles).map(map)}
            {props.users?.map(item => item.mi + CustomAttUseTaleId.Users).map(map)}
            {props.games?.map(item => item.mi + CustomAttUseTaleId.Games).map(map)}
          </>,
        )}
      </>
    );
  });

  return (
    <>
      {modalNode}
      <IconButton
        Icon={IconArrowReloadHorizontalStrokeRounded}
        onClick={openModal}
      />
    </>
  );
}
