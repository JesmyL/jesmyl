import { translateBase } from '#basis/locale';
import { TextInput } from '#shared/ui/TextInput';
import { TheButton } from '#shared/ui/TheButton';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { CmChordCard, CmChordCardImageList } from '$cm/entities/chord-card';
import { useCmCom, useCmComLastOpenComw } from '$cm/entities/com';
import { Atom, atom } from 'atomaric';
import { useMemo, useState } from 'react';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { parseChordName } from 'shared/utils/cm/com/chordTrack';
import { correctBemoleChordRegsLazy } from 'shared/utils/cm/com/const';
import { CmComTool } from '../ComTool';

let isOpenAtom: Atom<boolean>;

const checkIsChordName = (chordName: string) => {
  if (!correctBemoleChordRegsLazy().regExp.test(chordName)) return false;

  try {
    parseChordName(chordName);
    return true;
  } catch {
    return false;
  }
};

export const CmComToolChordImages = () => {
  isOpenAtom ??= atom(false);

  const comw = useCmComLastOpenComw();
  const ccom = useCmCom(comw);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [chordName, setChordName] = useState('');
  const isValid = useMemo(() => checkIsChordName(chordName), [chordName]);

  return (
    <>
      <CmComTool
        title={translateBase(it => it[BaseLocaleKey.CmMarkComTool][MenuComToolName.ChordImages])}
        icon="TwoFinger05"
        iconClassName="-scale-x-100!"
        onClick={isOpenAtom.do.toggle}
      />

      <FullContent openAtom={isOpenAtom}>
        <div className="mb-5 flex flex-col items-center gap-3">
          <TheButton onClick={() => setIsPickerOpen(!isPickerOpen)}>{translateBase(BaseLocaleKey.CmPickChord)}</TheButton>
          {isPickerOpen && (
            <>
              <TextInput
                autoFocus
                className="max-w-70 text-center"
                value={chordName}
                onInput={setChordName}
              />
              {chordName && !isValid && (
                <div className="text-xKO">{translateBase(BaseLocaleKey.InvalidChordName, { n: chordName })}</div>
              )}
              {isValid && <CmChordCard chordName={chordName} />}
            </>
          )}
        </div>
        {isPickerOpen || !ccom || <CmChordCardImageList com={ccom} />}
      </FullContent>
    </>
  );
};
