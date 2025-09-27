import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { DropdownItem } from '#shared/ui/dropdown/Dropdown.model';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { removedCompositionsAtom } from '$cm+editor/basis/lib/atoms/com';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/basis/lib/cm-editor.tsjrpc.methods';
import { cmEditorIDB } from '$cm+editor/basis/lib/cmEditorIDB';
import { useEditableCcom } from '$cm+editor/basis/lib/hooks/useEditableCom';
import { TextCorrectMessages } from '$cm+editor/entities/TextBlockIncorrectMessages';
import { ChordVisibleVariant } from '$cm/Cm.model';
import { TheCom } from '$cm/col/com/TheCom';
import { useCheckUserAccessRightsInScope } from '$index/checkers';
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
  const [name, setName] = useState('');
  const eeStore = cmEditorIDB.useValue.eeStore();
  const checkAccess = useCheckUserAccessRightsInScope();

  if (!ccom) return null;
  const nameCorrects = CmComUtils.takeTextBlockIncorrects(name, eeStore);

  const comNode = (
    <TheCom
      com={ccom}
      chordVisibleVariant={ChordVisibleVariant.Maximal}
      isMiniAnchor={false}
    />
  );

  if (!checkAccess('cm', 'COM_MAIN', 'U')) return comNode;

  return (
    <>
      <InputWithLoadingIcon
        icon="SchoolReportCard"
        label="Название"
        defaultValue={ccom.name}
        isError={!!nameCorrects.errors?.length}
        onChanged={value => cmEditComClientTsjrpcMethods.rename({ comw: ccom.wid, value })}
        onInput={setName}
      />
      <TextCorrectMessages corrects={nameCorrects} />

      <InputWithLoadingIcon
        icon="DashboardSpeed02"
        label="Ударов в минуту"
        type="tel"
        defaultValue={'' + (ccom.beatsPerMinute ?? '')}
        onChanged={value => cmEditComClientTsjrpcMethods.setBpM({ comw: ccom.wid, value: +value })}
        onInput={emptyFunc}
      />
      <div className="flex w-full between my-2">
        <LazyIcon icon="DashboardSpeed02" />
        <div className="mx-2 nowrap">Размерность</div>
        <Dropdown
          id={ccom.meterSize}
          items={meterSizeItems}
          onSelectId={value => {
            cmEditComClientTsjrpcMethods.setMeterSize({ comw: ccom.wid, value });
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
          cmEditComClientTsjrpcMethods.changeLanguage({ comw: ccom.wid, value: ccom.langi ? 0 : 1 });
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
            <span className="text-x7">{ccom.isBemoled ? 'Бемольная' : 'Диезная'}</span> песня
          </>
        }
        onClick={() => {
          cmEditComClientTsjrpcMethods.makeBemoled({ comw: ccom.wid, value: ccom.isBemoled === 1 ? 0 : 1 });
        }}
      />
      {checkAccess('cm', 'COM', 'D') && (
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
            cmEditComClientTsjrpcMethods.remove({ comw: ccom.wid });
          }}
        />
      )}

      {comNode}
    </>
  );
};
