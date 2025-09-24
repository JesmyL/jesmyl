import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { questionerAdminTsjrpcClient } from '$q/processes/tsjrpc/admin.tsjrpc';
import { QuestionerBlank, QuestionerBlankWid } from 'shared/model/q';

export const QuestionerBlankRedactorControls = ({
  onUpdate,
  blankw,
  blank,
}: {
  onUpdate: () => void;
  blankw: QuestionerBlankWid;
  blank: QuestionerBlank;
}) => {
  return (
    <>
      <InputWithLoadingIcon
        icon="TextFont"
        label="Название"
        defaultValue={blank.title}
        onChange={value => questionerAdminTsjrpcClient.changeBlankTitle({ blankw, value }).then(onUpdate)}
      />

      <InputWithLoadingIcon
        icon="TextAlignLeft"
        label="Описание"
        defaultValue={blank.dsc}
        multiline
        onChange={value => questionerAdminTsjrpcClient.changeBlankDescription({ blankw, value }).then(onUpdate)}
      />

      <div onClick={() => questionerAdminTsjrpcClient.switchBlankIsAnonymous({ blankw }).then(onUpdate)}>
        <IconCheckbox
          isRadio
          checked={!!blank.anon}
          postfix="Анонимный опрос"
        />
        <IconCheckbox
          isRadio
          checked={!blank.anon}
          postfix="Запрашивать Фамилию/Имя"
        />
      </div>
    </>
  );
};
