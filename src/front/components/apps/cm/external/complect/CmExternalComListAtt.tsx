import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CmComBindAttach, CmComWid } from 'shared/api';
import { FullContent } from '../../../../../complect/fullscreen-content/FullContent';
import { ChordVisibleVariant } from '../../Cm.model';
import { useCcat } from '../../col/cat/useCcat';
import { ComFaceList } from '../../col/com/face/list/ComFaceList';
import { useCcom } from '../../col/com/useCcom';
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

  const [comw, setComw] = useState<CmComWid | und>();
  const com = useCcom(comw);
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
            setComw={setComw}
            setIsOpenComposition={setIsOpenComposition}
          />
        </FullContent>
      )}

      {isOpenComposition && (
        <FullContent onClose={setIsOpenComposition}>
          <TheComForFullScreen
            com={com}
            chordVisibleVariant={ChordVisibleVariant.Maximal}
            comwList={value.comws}
            onComSet={setComw}
          />
        </FullContent>
      )}
    </>
  );
}
