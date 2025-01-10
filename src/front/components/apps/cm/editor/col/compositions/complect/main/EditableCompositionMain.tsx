import { InputWithLoadingIcon } from 'front/components/apps/cm/base/InputWithLoadingIcon';
import { cmComClientInvocatorMethods } from 'front/components/apps/cm/cm-invocator-editor.methods';
import { useState } from 'react';
import { emptyFunc } from 'shared/utils';
import Dropdown from '../../../../../../../../complect/dropdown/Dropdown';
import { DropdownItem } from '../../../../../../../../complect/dropdown/Dropdown.model';
import { useCheckIsAccessed } from '../../../../../../../../complect/exer/hooks/check-is-accessed';
import { useExerExec } from '../../../../../../../../complect/exer/hooks/useExer';
import { useConfirm } from '../../../../../../../../complect/modal/confirm/useConfirm';
import { IconDashboardSpeed02StrokeRounded } from '../../../../../../../../complect/the-icon/icons/dashboard-speed-02';
import { IconDelete01StrokeRounded } from '../../../../../../../../complect/the-icon/icons/delete-01';
import { IconFlag03StrokeRounded } from '../../../../../../../../complect/the-icon/icons/flag-03';
import { IconGridStrokeRounded } from '../../../../../../../../complect/the-icon/icons/grid';
import { IconSchoolReportCardStrokeRounded } from '../../../../../../../../complect/the-icon/icons/school-report-card';
import { useAuth } from '../../../../../../../index/molecules';
import { ChordVisibleVariant } from '../../../../../Cm.model';
import TheCom from '../../../../../col/com/TheCom';
import { TextCorrectMessages } from '../../../../complect/TextBlockIncorrectMessages';
import { useEditableCcom } from '../../useEditableCcom';
import { EditableCompositionMainTon } from './Ton';

const meterSizeItems: DropdownItem<3 | 4>[] = [
  {
    id: 4,
    title: '4/4',
  },
  {
    id: 3,
    title: '3/4',
  },
];

export default function EditableCompositionMain() {
  const ccom = useEditableCcom();
  const exec = useExerExec();
  const auth = useAuth();
  const checkIsAccessed = useCheckIsAccessed(auth);
  const [confirmNode, confirm] = useConfirm();
  const [name, setName] = useState('');

  if (!ccom) return null;
  const nameCorrects = ccom.textBlockIncorrectMessages(name);

  return (
    <>
      {confirmNode}
      <InputWithLoadingIcon
        Icon={IconSchoolReportCardStrokeRounded}
        label="Название"
        defaultValue={ccom.name}
        corrects={nameCorrects}
        onChange={value => cmComClientInvocatorMethods.rename(null, ccom.wid, value)}
        onInput={setName}
      />
      <TextCorrectMessages corrects={nameCorrects} />

      <InputWithLoadingIcon
        Icon={IconDashboardSpeed02StrokeRounded}
        label="Ударов в минуту"
        type="number"
        defaultValue={'' + (ccom.beatsPerMinute ?? '')}
        onChange={value => cmComClientInvocatorMethods.setBpM(null, ccom.wid, +value)}
        onInput={emptyFunc}
      />
      <div className="flex full-width between margin-gap-v">
        <IconDashboardSpeed02StrokeRounded />
        <div className="margin-gap-h nowrap">Размерность</div>
        <Dropdown
          id={ccom.meterSize}
          items={meterSizeItems}
          onSelectId={value => {
            cmComClientInvocatorMethods.setMeterSize(null, ccom.wid, value);
          }}
        />
      </div>
      <div
        className="flex full-width between margin-gap-v pointer"
        onClick={event => {
          event.stopPropagation();
          cmComClientInvocatorMethods.changeLanguage(null, ccom.wid, ccom.langi ? 0 : 1);
        }}
      >
        <IconFlag03StrokeRounded />
        <div className="title half-width text-center">Язык</div>
        <div className="half-width text-center">{ccom.langn}</div>
      </div>
      <EditableCompositionMainTon ccom={ccom} />
      <div
        className="flex full-width between margin-gap-v pointer"
        onClick={() => {
          cmComClientInvocatorMethods.makeBemoled(null, ccom.wid, ccom.isBemoled === 1 ? 0 : 1);
        }}
      >
        <IconGridStrokeRounded />
        <div className="title half-width  text-center">Сделать {ccom.isBemoled ? 'диезным' : 'бемольным'}</div>
        <div className="half-width" />
      </div>
      {checkIsAccessed(100) && (
        <div
          className="flex full-width between error-message margin-gap-v pointer"
          onClick={() => {
            confirm(`Удалить песню "${ccom.name}"?`).then(isRemove => isRemove && exec(ccom.remove()));
          }}
        >
          <IconDelete01StrokeRounded />
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
}
