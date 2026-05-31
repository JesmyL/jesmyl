import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Button } from '#shared/components';
import { MyLib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { WithAtom } from '#shared/ui/WithAtom';
import { CmEditorTextCorrectMessages } from '$cm+editor/entities/text';
import { CmEditorComEditBpm } from '$cm+editor/features/ComEditBpm';
import { CmEditorComEditTransposition } from '$cm+editor/features/ComEditTransposition';
import { EditableCom } from '$cm+editor/shared/classes/EditableCom';
import { cmEditComClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { cmEditorIDB } from '$cm+editor/shared/state/cmEditorIDB';
import { removedCompositionsAtom } from '$cm+editor/shared/state/com';
import { ChordVisibleVariant, TheCmCom } from '$cm/ext';
import { useState } from 'react';
import { makeRegExp } from 'regexpert';
import { CmComIntensityLevel } from 'shared/api';
import { cmComIntensityLevelTitleDict } from 'shared/const/cm/cmComDriveLevelTitleDict';
import { cmComMetricNumTitles } from 'shared/const/cm/com-metric-nums';
import { CmComMetricNum } from 'shared/model/cm/com-metric-nums';
import { emptyFunc } from 'shared/utils';
import { takeTextBlockIncorrects } from 'shared/utils/cm/com/takeTextBlockIncorrects';

export const CmEditorComTabMain = ({ ccom }: { ccom: EditableCom }) => {
  const [name, setName] = useState('');
  const eeStore = cmEditorIDB.useValue.eeStore();
  const checkAccess = useCheckUserAccessRightsInScope();
  const nameCorrects = takeTextBlockIncorrects(name, eeStore);

  const comNode = (
    <TheCmCom
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
      <CmEditorTextCorrectMessages corrects={nameCorrects} />

      <CmEditorComEditBpm
        def={ccom.beatsPerMinute}
        onChange={value => cmEditComClientTsjrpcMethods.setBpM({ comw: ccom.wid, value })}
      />
      <Dropdown
        label={
          <>
            <LazyIcon icon="Ruler" />
            Размерность
          </>
        }
        id={ccom.meterSize ?? CmComMetricNum.Four}
        items={MyLib.entries(cmComMetricNumTitles).map(([idStr, title]) => ({
          id: +idStr,
          title,
        }))}
        onSelectId={value => cmEditComClientTsjrpcMethods.setMeterSize({ comw: ccom.wid, value })}
      />
      <Dropdown
        label={
          <>
            <LazyIcon icon="SpeedTrain01" />
            Интенсивность
          </>
        }
        id={ccom.top.d ?? CmComIntensityLevel.Medium}
        items={MyLib.entries(cmComIntensityLevelTitleDict).map(([id, title]) => ({ id: +id, title }))}
        onSelectId={value => cmEditComClientTsjrpcMethods.changeDrive({ comw: ccom.wid, value })}
      />
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
      <CmEditorComEditTransposition
        ccom={ccom}
        onChange={position => cmEditComClientTsjrpcMethods.changeTon({ comw: ccom.wid, value: position })}
      />
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
        onClick={() =>
          cmEditComClientTsjrpcMethods.makeBemoled({ comw: ccom.wid, value: ccom.isBemoled === 1 ? 0 : 1 })
        }
      />
      {checkAccess('cm', 'COM', 'D') && (
        <>
          <TheIconButton
            icon="Delete01"
            className="text-xKO"
            confirm={
              <>
                Удалить песню <span className="text-x7">{ccom.name}</span>?
              </>
            }
            postfix="Удалить песню"
            onClick={() => {
              removedCompositionsAtom.set(prev => ({ ...prev, [ccom.wid]: ccom.name }));
              return cmEditComClientTsjrpcMethods.remove({ comw: ccom.wid });
            }}
          />
          <WithAtom init={false}>
            {openAtom => (
              <>
                <Button
                  icon="Code"
                  onClick={openAtom.do.toggle}
                >
                  Посмотреть JSON
                </Button>
                <FullContent openAtom={openAtom}>
                  {isOpen =>
                    isOpen && (
                      <>
                        <div className="my-3">{JSON.stringify(ccom.top).length} символов</div>
                        <textarea
                          className="size-full bg-x2!"
                          onChange={emptyFunc}
                          value={JSON
                            //
                            .stringify(
                              ccom.top,
                              (key, value) => (isNaN(+key) || !Array.isArray(value) ? value : JSON.stringify(value)),
                              2,
                            )
                            .replace(
                              makeRegExp('/\\[\\s*((?:[-"\\d,.[\\]]*|null|,|\\s)*)\\s*\\]/g'),
                              //
                              all => all.replace(makeRegExp('/"/g'), ''),
                            )}
                        />
                      </>
                    )
                  }
                </FullContent>
              </>
            )}
          </WithAtom>
        </>
      )}

      {comNode}
    </>
  );
};
