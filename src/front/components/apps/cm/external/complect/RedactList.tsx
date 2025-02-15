import { useState } from 'react';
import { CmComBindAttach, CmComWid } from 'shared/api';
import { FullContent } from '../../../../../complect/fullscreen-content/FullContent';
import IconButton from '../../../../../complect/the-icon/IconButton';
import { Com } from '../../col/com/Com';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { CmComListSearchFilterInput } from '../../complect/ComListSearchFilterInput';
import { EditableCom } from '../../editor/col/compositions/com/EditableCom';
import CmExternalComListAttRedactListOrder from './RedactListOrder';

interface Props {
  value: CmComBindAttach;
  setComw: (comw: CmComWid) => void;
  setIsOpenComposition: (isOpen: boolean) => void;
}

export default function CmExternalComListAttRedactList({ value, setComw: setCcomw, setIsOpenComposition }: Props) {
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [coms, setComs] = useState<Com[]>([]);

  return (
    <>
      <div className="flex column full-height">
        <div className="flex around full-width margin-big-gap-v">
          <IconButton
            icon="Arrange"
            postfix="Порядок песен"
            disabled={!value.comws || value.comws.length < 2}
            onClick={() => setIsOrderOpen(true)}
          />
        </div>

        <CmComListSearchFilterInput
          Constructor={EditableCom}
          onSearch={setComs}
        />
        <div className="margin-gap-t full-height full-width over-y-auto">
          <ComFaceList
            list={coms}
            importantOnClick={com => {
              setCcomw(com.wid);
              setIsOpenComposition(true);
            }}
          />
        </div>
      </div>

      {isOrderOpen && (
        <FullContent onClose={setIsOrderOpen}>
          <CmExternalComListAttRedactListOrder
            value={value}
            setCcomw={setCcomw}
          />
        </FullContent>
      )}
    </>
  );
}
