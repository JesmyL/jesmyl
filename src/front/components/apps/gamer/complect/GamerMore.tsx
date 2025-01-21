import { bottomPopupContentPreparer } from '../../../../complect/absolute-popup/bottom-popup/item-preparer';
import { BottomPopupContenter } from '../../../../complect/absolute-popup/bottom-popup/model';
import { useCheckIsAccessed } from '../../../../complect/exer/hooks/check-is-accessed';
import useFullContent from '../../../../complect/fullscreen-content/useFullContent';
import useToast from '../../../../complect/modal/useToast';
import { IconPlusSignStrokeRounded } from '../../../../complect/the-icon/icons/plus-sign';
import { useAuth } from '../../../index/atoms';
import NewGamerRoomScreen from './rooms/NewGamerRoomScreen';
import { useGamerOfflineRoomsPassport } from './rooms/offline-room/hooks/passport';

export const GamerMore: BottomPopupContenter = () => {
  const auth = useAuth();
  const [newRoomMakerNode, openNewRoomMaker] = useFullContent(close => <NewGamerRoomScreen close={close} />);
  const [newRoomOffMakerNode, openNewOffRoomMaker] = useFullContent(close => (
    <NewGamerRoomScreen
      close={close}
      offline
    />
  ));
  const passport = useGamerOfflineRoomsPassport();
  const [toastNode, toast] = useToast();
  const checkIsAccessed = useCheckIsAccessed(auth);

  return [
    <>
      {newRoomMakerNode}
      {newRoomOffMakerNode}
      {toastNode}
    </>,
    <>
      {bottomPopupContentPreparer({
        items: [
          checkIsAccessed(3) && {
            title: 'Новая комната',
            Icon: IconPlusSignStrokeRounded,
            onClick: () => openNewRoomMaker(),
          },
          {
            title: 'Новая оффлайн комната',
            Icon: IconPlusSignStrokeRounded,
            className: passport ? '' : ' fade-05',
            onClick: () => {
              if (passport) openNewOffRoomMaker();
              else toast('Нужно создать паспорт для добавления оффлайн комнат', { mood: 'ko' });
            },
          },
        ],
      })}
    </>,
  ];
};
