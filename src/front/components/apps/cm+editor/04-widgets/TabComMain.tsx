import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { removedCompositionsAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmEditComClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { cmEditorIDB } from '$cm+editor/basis/lib/cmEditorIDB';
import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { TextCorrectMessages } from '$cm+editor/entities/TextBlockIncorrectMessages';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { TheCom } from '$cm/col/com/TheCom';
import { useAuth } from '$index/atoms';
import { useAtomSet } from 'atomaric';
import { useState } from 'react';
import { emptyFunc } from 'shared/utils';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
import { CmComEditTransposition } from './ComEditTransposition';

const meterSizeItems: DropdownItem<3 | 4>[] = [
  { id: 4, title: '4/4' },
  { id: 3, title: '3/4' },
];

export const CmEditorTabComMain = () => {
  const ccom = useEditableCcom();
  const setRemovedComs = useAtomSet(removedCompositionsAtom);
  const auth = useAuth();
  const [name, setName] = useState('');
  const eeStore = cmEditorIDB.useValue.eeStore();

  if (!ccom) return null;
  const nameCorrects = CmComUtils.takeTextBlockIncorrects(name, eeStore);

  return (
    <>
      <InputWithLoadingIcon
        icon="SchoolReportCard"
        label="Название"
        defaultValue={ccom.name}
        isError={!!nameCorrects.errors?.length}
        onChange={value => cmEditComClientInvocatorMethods.rename({ comw: ccom.wid, value })}
        onInput={setName}
      />
      <TextCorrectMessages corrects={nameCorrects} />

      <InputWithLoadingIcon
        icon="DashboardSpeed02"
        label="Ударов в минуту"
        type="number"
        defaultValue={'' + (ccom.beatsPerMinute ?? '')}
        onChange={value => cmEditComClientInvocatorMethods.setBpM({ comw: ccom.wid, value: +value })}
        onInput={emptyFunc}
      />
      <div className="flex full-width between margin-gap-v">
        <LazyIcon icon="DashboardSpeed02" />
        <div className="margin-gap-h nowrap">Размерность</div>
        <Dropdown
          id={ccom.meterSize}
          items={meterSizeItems}
          onSelectId={value => {
            cmEditComClientInvocatorMethods.setMeterSize({ comw: ccom.wid, value });
          }}
        />
      </div>
      <TheIconButton
        icon="Flag03"
        confirm={
          <>
            Переключить язык песни на <span className="text-x7">{ccom.nextLangn}</span>?
          </>
        }
        postfix={
          <>
            Язык — <span className="text-x7">{ccom.langn}</span>
          </>
        }
        onClick={event => {
          event.stopPropagation();
          cmEditComClientInvocatorMethods.changeLanguage({ comw: ccom.wid, value: ccom.langi ? 0 : 1 });
        }}
      />
      <CmComEditTransposition ccom={ccom} />
      <TheIconButton
        icon="Grid"
        confirm={
          <>
            Сделать песню <span className="text-x7">{ccom.isBemoled ? 'диезной' : 'бемольной'}</span>?
          </>
        }
        postfix={
          <>
            <span className="text-x7">{ccom.isBemoled ? 'Диезная' : 'Бемольная'}</span> песня
          </>
        }
        onClick={() => {
          cmEditComClientInvocatorMethods.makeBemoled({ comw: ccom.wid, value: ccom.isBemoled === 1 ? 0 : 1 });
        }}
      />
      {auth.level === 100 && (
        <TheIconButton
          icon="Delete01"
          className="text-xKO"
          confirm={
            <>
              Удалить песню <span className="text-x7">{ccom.name}</span>?
            </>
          }
          postfix="Удалить песню"
          onClick={async () => {
            setRemovedComs(prev => ({ ...prev, [ccom.wid]: ccom.name }));
            cmEditComClientInvocatorMethods.remove({ comw: ccom.wid });
          }}
        />
      )}

      <TheCom
        com={ccom}
        chordVisibleVariant={ChordVisibleVariant.Maximal}
        isMiniAnchor={false}
      />
    </>
  );
};
