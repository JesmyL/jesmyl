import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
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
        label="Название"
        strongDefaultValue
        defaultValue={blank.title}
        onChanged={value => questionerAdminTsjrpcClient.changeBlankTitle({ blankw, value })}
      />

      <InputWithLoadingIcon
        icon="TextAlignLeft"
        label="Описание"
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
            title: 'Анонимный опрос',
          },
          {
            id: false,
            title: 'Запрашивать Фамилию/Имя',
          },
        ]}
        onSelectId={() => questionerAdminTsjrpcClient.switchBlankIsAnonymous({ blankw })}
      />
    </>
  );
};
