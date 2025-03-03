import { KeyboardInput } from '#shared/ui/keyboard/KeyboardInput';
import { EditableCom } from '@cm/editor/lib/EditableCom';
import { TextCorrectMessages } from '@cm/editor/ui/TextBlockIncorrectMessages';
import { IExportableCom } from 'shared/api';

export const NewComNameChange = ({
  name,
  setNewCom,
}: {
  name: string | und;
  setNewCom: (value: React.SetStateAction<IExportableCom>) => void;
}) => {
  return (
    <>
      <div className="flex full-width">
        <span className="margin-gap-h">Название </span>
        <div
          id="new-com-input-wrapper"
          className="full-width"
        >
          <KeyboardInput
            className="full-width"
            value={name}
            onInput={n => setNewCom(prev => ({ ...prev, n }))}
          />
        </div>
      </div>
      <TextCorrectMessages corrects={EditableCom.textBlockIncorrectMessages(name)} />
    </>
  );
};
