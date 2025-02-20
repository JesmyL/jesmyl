import { useEffect, useRef } from 'react';
import { CmComWid } from 'shared/api';
import { ChordVisibleVariant } from '../../basis/model/Cm.model';
import { Com } from '../../col/com/Com';
import { TheControlledCom } from '../../col/com/TheControlledCom';

export default function TheComForFullScreen({
  com,
  comwList,
  chordVisibleVariant,
  onComSet,
}: {
  com?: Com;
  comwList?: CmComWid[] | nil;
  chordVisibleVariant: ChordVisibleVariant;
  onComSet: (comw: CmComWid) => void;
}) {
  const comListElem = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (comListElem.current) comListElem.current.scrollTop = 0;
  }, [com?.wid]);

  if (!com) return null;

  return (
    <div
      ref={comListElem}
      className="absolute full-width full-height over-y-auto pos-top pos-left"
    >
      <TheControlledCom
        com={com}
        chordVisibleVariant={chordVisibleVariant}
        comwList={comwList}
        onComSet={onComSet}
      />
    </div>
  );
}
