import { TextInput } from '#shared/ui/TextInput';
import { CmEditorTextCorrectMessages } from '$cm+editor/entities/text';
import { IExportableCom } from 'shared/api';
import { IIncorrects } from 'shared/model/cm/Incorrects';

export const CmEditorComCreateNameChange = ({
  name,
  setNewCom,
  incorrcets,
}: {
  name: string | und;
  setNewCom: (value: React.SetStateAction<IExportableCom>) => void;
  incorrcets: IIncorrects;
}) => {
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
      <CmEditorTextCorrectMessages corrects={incorrcets} />
    </>
  );
};
