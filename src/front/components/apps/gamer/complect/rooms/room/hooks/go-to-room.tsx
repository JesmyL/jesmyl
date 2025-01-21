import { useCallback } from 'react';
import { useConfirm } from '../../../../../../../complect/modal/confirm/useConfirm';
import useToast from '../../../../../../../complect/modal/useToast';
import { useAuth } from '../../../../../../index/atoms';
import { gamerExer } from '../../../../gamerExer';
import gamerStorage from '../../../../gamerStorage';
import { useGamerRoomwSetter } from '../../../../molecules';
import useGamerNav from '../../../../useGamerNav';
import { useMyPossibilitiesInRoom } from './possibilities';
import { useGamerRooms } from './rooms';

export default function useGamerOfflineRoomsActions() {
  const rooms = useGamerRooms();
  const setRoomw = useGamerRoomwSetter();
  const { goTo } = useGamerNav();
  const auth = useAuth();

  const memberPossibilities = useMyPossibilitiesInRoom();
  const [toastNode, toast] = useToast();
  const [confirmNode, confirm] = useConfirm();

  return [
    <>
      {toastNode}
      {confirmNode}
    </>,
    useCallback(
      (roomWid: number) => {
        const possibilities = memberPossibilities(rooms?.find(({ w }) => w === roomWid));
        if (possibilities.isUnauthorized) {
          toast('Не авторизован', { mood: 'ko' });
          return;
        }
        if (possibilities.isInvalid) {
          if (possibilities.member == null) {
            confirm(
              'Просматривать результаты и участвовать могут только добавленные в комнату участники. Отправить заявку на вступление?',
            ).then(isRequest => {
              if (isRequest)
                gamerExer.send({
                  action: 'requestAddToRoom',
                  method: 'push',
                  args: {
                    login: auth.login,
                    fio: auth.fio,
                    nick: auth.nick,
                    roomw: roomWid,
                  },
                });
            });
          } else if (possibilities.isRequester)
            toast('Заявка на вступление в комнату отправлена. Дождись принятия, или свяжись с владельцем комнаты.');
          else toast('Тебя исключили из комнаты', { mood: 'ko' });
          return;
        }

        gamerStorage.set('roomw', roomWid);
        setRoomw(roomWid);
        goTo('room');
      },
      [memberPossibilities, rooms, setRoomw, goTo, toast, confirm, auth.login, auth.fio, auth.nick],
    ),
  ] as const;
}
