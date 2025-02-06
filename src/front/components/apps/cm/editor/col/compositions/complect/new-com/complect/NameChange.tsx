import KeyboardInput from 'front/complect/keyboard/KeyboardInput';
import { TextCorrectMessages } from 'front/components/apps/cm/editor/complect/TextBlockIncorrectMessages';
import { IExportableCom } from 'shared/api';
import { EditableCom } from '../../../com/EditableCom';

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
        <div className="full-width">
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
