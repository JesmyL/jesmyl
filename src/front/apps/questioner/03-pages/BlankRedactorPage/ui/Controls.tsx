import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
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
        onChanged={value => questionerAdminTsjrpcClient.changeBlankTitle({ blankw, value }).then(onUpdate)}
      />

      <InputWithLoadingIcon
        icon="TextAlignLeft"
        label="Описание"
        defaultValue={blank.dsc}
        multiline
        onChanged={value => questionerAdminTsjrpcClient.changeBlankDescription({ blankw, value }).then(onUpdate)}
      />

      <Dropdown
        id={!!blank.anon}
        items={[
          {
            id: true,
            title: 'Анонимный опрос',
          },
          {
            id: false,
            title: 'Запрашивать Фамилию/Имя',
          },
        ]}
        onSelectId={() => questionerAdminTsjrpcClient.switchBlankIsAnonymous({ blankw }).then(onUpdate)}
      />
    </>
  );
};
