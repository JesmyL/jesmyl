import { translateBase } from '#basis/locale';
import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { QuestionerBlank, QuestionerBlankWid } from 'shared/model/q';

export const QuestionerBlankRedactorControls = ({
  blankw,
  blank,
}: {
  blankw: QuestionerBlankWid;
  blank: QuestionerBlank;
}) => {
  return (
    <>
      <InputWithLoadingIcon
        icon="TextFont"
        label={translateBase(BaseLocaleKey.Name)}
        strongDefaultValue
        defaultValue={blank.title}
        onChanged={value => questionerAdminTsjrpcClient.changeBlankTitle({ blankw, value })}
      />

      <InputWithLoadingIcon
        icon="TextAlignLeft"
        label={translateBase(BaseLocaleKey.Description)}
        defaultValue={blank.dsc}
        multiline
        strongDefaultValue
        onChanged={value => questionerAdminTsjrpcClient.changeBlankDescription({ blankw, value })}
      />

      <Dropdown
        id={!!blank.anon}
        items={[
          {
            id: true,
            title: translateBase(BaseLocaleKey.QuestionerAnonymous),
          },
          {
            id: false,
            title: translateBase(BaseLocaleKey.QuestionerAskFullName),
          },
        ]}
        onSelectId={() => questionerAdminTsjrpcClient.switchBlankIsAnonymous({ blankw })}
      />
    </>
  );
};
