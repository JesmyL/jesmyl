import { translateBase } from '#basis/locale';
import { TextInput } from '#shared/ui/TextInput';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { CmChordCard, CmChordCardImageList } from '$cm/entities/chord-card';
import { useCmCom, useCmComLastOpenComw } from '$cm/entities/com';
import { Atom, atom } from 'atomaric';
import { useMemo, useState } from 'react';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { normalizeChordName, parseChordName } from 'shared/utils/cm/com/chordTrack';
import { ChordInstrument } from 'shared/utils/cm/com/chordTrack.model';
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
  const [instrument, setInstrument] = useState(ChordInstrument.Guitar);
  const normalizedChordName = normalizeChordName(chordName);
  const isValid = useMemo(() => checkIsChordName(normalizedChordName), [normalizedChordName]);

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
          <div className="flex items-center gap-3">
            <TheIconButton
              icon="SearchFocus"
              onClick={() => setIsPickerOpen(!isPickerOpen)}
            />
            <Dropdown
              id={instrument}
              onSelectId={setInstrument}
              items={[
                { id: ChordInstrument.Guitar, title: translateBase(BaseLocaleKey.CmGuitar) },
                { id: ChordInstrument.Ukulele, title: translateBase(BaseLocaleKey.CmUkulele) },
              ]}
            />
          </div>
          {isPickerOpen && (
            <>
              <TextInput
                autoFocus
                className="max-w-70 text-center"
                value={chordName}
                onInput={setChordName}
              />
              {normalizedChordName && !isValid && (
                <div className="text-xKO">
                  {translateBase(BaseLocaleKey.InvalidChordName, { n: normalizedChordName })}
                </div>
              )}
              {isValid && (
                <CmChordCard
                  chordName={normalizedChordName}
                  instrument={instrument}
                />
              )}
            </>
          )}
        </div>
        {isPickerOpen || !ccom || (
          <CmChordCardImageList
            com={ccom}
            instrument={instrument}
          />
        )}
      </FullContent>
    </>
  );
};
