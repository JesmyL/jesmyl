import { BottomPopupContenter } from '../../../../../complect/absolute-popup/bottom-popup/model';
import useFullContent from '../../../../../complect/fullscreen-content/useFullContent';
import LeaderGroupMaster from './GroupMaster';
import { LeaderGroupImportable } from './Groups.model';

export const LeaderGroupMoreContenter: BottomPopupContenter<{
  group?: LeaderGroupImportable;
}> = (isOpen, _, prepare, { group }) => {
  const [groupMasterNode, openGroupMaster] = useFullContent(close => (
    <LeaderGroupMaster
      close={close}
      group={group}
    />
  ));

  return [
    groupMasterNode,
    isOpen &&
      prepare({
        items: [
          {
            title: 'Редактировать',
            icon: 'edit-outline',
            onClick: () => openGroupMaster(),
          },
        ],
      }),
  ];
};
