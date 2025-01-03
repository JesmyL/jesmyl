import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CmComBindAttach } from 'shared/api';
import { itIt } from 'shared/utils';
import { FullContent } from '../../../../../complect/fullscreen-content/FullContent';
import { ChordVisibleVariant } from '../../Cm.model';
import { useCcat } from '../../col/cat/useCcat';
import { Com } from '../../col/com/Com';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { useMeetings } from '../../lists/meetings/useMeetings';
import CmExternalComListAttRedactList from './RedactList';
import TheComForFullScreen from './TheComForFullScreen';

interface Props {
  value: CmComBindAttach;
  scope: string;
  isRedact?: boolean;
  switchIsRedact: (is?: boolean) => void;
  listPath: string;
}

export default function CmExternalComListAtt({ value, scope, isRedact, switchIsRedact, listPath }: Props) {
  const [isOpenComposition, setIsOpenComposition] = useState(false);
  const navigate = useNavigate();

  const [ccom, setCcom] = useState<Com | und>();
  const cat = useCcat(true);
  const { meetings } = useMeetings();
  const currentEvent = value.eventw == null ? null : meetings?.stack?.find(event => event.w === value.eventw!);
  const comws = useMemo(
    () => (currentEvent ? (value.comws ? [...currentEvent.s, ...value.comws] : currentEvent.s) : value.comws),
    [currentEvent, value.comws],
  );

  return (
    <>
      {!currentEvent && !value.comws?.length && <div>Песен нет</div>}
      {cat && (
        <ComFaceList
          list={comws}
          importantOnClick={com => navigate(`${listPath}/${com.wid}`)}
        />
      )}

      {isRedact && (
        <FullContent onClose={switchIsRedact}>
          <CmExternalComListAttRedactList
            scope={scope}
            value={value}
            setCcom={setCcom}
            setIsOpenComposition={setIsOpenComposition}
          />
        </FullContent>
      )}

      {isOpenComposition && (
        <FullContent onClose={setIsOpenComposition}>
          <TheComForFullScreen
            com={ccom}
            chordVisibleVariant={ChordVisibleVariant.Maximal}
            comList={(cat && value.comws?.map(comw => cat.coms.find(com => com.wid === comw)!).filter(itIt)) ?? []}
            onComSet={setCcom}
          />
        </FullContent>
      )}
    </>
  );
}
