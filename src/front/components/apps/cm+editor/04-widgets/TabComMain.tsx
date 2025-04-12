import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { useAtomSet } from '#shared/lib/atom';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { useConfirm } from '#shared/ui/modal/confirm/useConfirm';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { removedCompositionsAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmEditComClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { EditableCom } from '$cm+editor/basis/lib/EditableCom';
import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { TextCorrectMessages } from '$cm+editor/entities/TextBlockIncorrectMessages';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { TheCom } from '$cm/col/com/TheCom';
import { useAuth } from '$index/atoms';
import { useState } from 'react';
import { emptyFunc } from 'shared/utils';
import { CmComEditTransposition } from './ComEditTransposition';

const meterSizeItems: DropdownItem<3 | 4>[] = [
  { id: 4, title: '4/4' },
  { id: 3, title: '3/4' },
];

export const CmEditorTabComMain = () => {
  const ccom = useEditableCcom();
  const setRemovedComs = useAtomSet(removedCompositionsAtom);
  const auth = useAuth();
  const confirm = useConfirm();
  const [name, setName] = useState('');

  if (!ccom) return null;
  const nameCorrects = EditableCom.textBlockIncorrectMessages(name);

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
      <div
        className="flex full-width between margin-gap-v pointer"
        onClick={event => {
          event.stopPropagation();
          cmEditComClientInvocatorMethods.changeLanguage({ comw: ccom.wid, value: ccom.langi ? 0 : 1 });
        }}
      >
        <LazyIcon icon="Flag03" />
        <div className="title half-width text-center">Язык</div>
        <div className="half-width text-center">{ccom.langn}</div>
      </div>
      <CmComEditTransposition ccom={ccom} />
      <div
        className="flex full-width between margin-gap-v pointer"
        onClick={() => {
          cmEditComClientInvocatorMethods.makeBemoled({ comw: ccom.wid, value: ccom.isBemoled === 1 ? 0 : 1 });
        }}
      >
        <LazyIcon icon="Grid" />
        <div className="title half-width  text-center">Сделать {ccom.isBemoled ? 'диезным' : 'бемольным'}</div>
        <div className="half-width" />
      </div>
      {auth.level === 100 && (
        <div
          className="flex full-width between error-message margin-gap-v pointer"
          onClick={async () => {
            if (!(await confirm(`Удалить песню "${ccom.name}"?`))) return;
            setRemovedComs(prev => ({ ...prev, [ccom.wid]: ccom.name }));
            cmEditComClientInvocatorMethods.remove({ comw: ccom.wid });
          }}
        >
          <LazyIcon icon="Delete01" />
          <div className="title half-width text-center">Удалить песню</div>
          <div className="half-width" />
        </div>
      )}

      <TheCom
        com={ccom}
        chordVisibleVariant={ChordVisibleVariant.Maximal}
        isMiniAnchor={false}
      />
    </>
  );
};
