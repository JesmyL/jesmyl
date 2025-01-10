import { BottomPopupItem } from 'front/complect/absolute-popup/bottom-popup/BottomPopupItem';
import { FullContent } from 'front/complect/fullscreen-content/FullContent';
import { useState } from 'react';
import { IconPlusSignCircleStrokeRounded } from '../../../../../../../complect/the-icon/icons/plus-sign-circle';
import { EditableCom } from '../com/EditableCom';
import NewComposition from './NewComposition';

export const EditCompositionsMore = () => {
  const [newEditableCom, setNewEditableCom] = useState<EditableCom | null>(null);

  return (
    <>
      {newEditableCom && (
        <FullContent onClose={() => setNewEditableCom(null)}>
          <NewComposition
            com={newEditableCom}
            close={() => {
              setNewEditableCom(null);
            }}
          />
        </FullContent>
      )}
      <BottomPopupItem
        Icon={IconPlusSignCircleStrokeRounded}
        title="Новая песня"
        onClick={event => {
          event.stopPropagation();
          const w = Date.now();
          setNewEditableCom(new EditableCom({ n: '', w, m: w, t: [], c: [], o: [] }).create());
        }}
      />
    </>
  );
};
