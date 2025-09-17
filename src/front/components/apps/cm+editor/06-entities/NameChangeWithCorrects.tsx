import { TextInput } from '#shared/ui/TextInput';
import { cmEditorIDB } from '$cm+editor/basis/lib/cmEditorIDB';
import { TextCorrectMessages } from '$cm+editor/entities/TextBlockIncorrectMessages';
import { IExportableCom } from 'shared/api';
import { CmComUtils } from 'shared/utils/cm/ComUtils';

export const NewComNameChange = ({
  name,
  setNewCom,
}: {
  name: string | und;
  setNewCom: (value: React.SetStateAction<IExportableCom>) => void;
}) => {
  const eeStore = cmEditorIDB.useValue.eeStore();

  return (
    <>
      <div className="flex w-full">
        <span className="mx-2">Название </span>
        <div
          id="new-com-input-wrapper"
          className="w-full"
        >
          <TextInput
            className="w-full"
            st-mood="2"
            value={name}
            onInput={n => setNewCom(prev => ({ ...prev, n }))}
          />
        </div>
      </div>
      <TextCorrectMessages corrects={CmComUtils.takeTextBlockIncorrects(name, eeStore)} />
    </>
  );
};
