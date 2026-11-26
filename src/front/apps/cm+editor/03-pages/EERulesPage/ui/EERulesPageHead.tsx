import { translateEditorBase } from '#basis/locale';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { EeStorePack } from 'shared/api';
import { EditorLocaleKey } from 'shared/model/+locale/_EditorLocaleKey';

type Props = {
  editedWords: string[];
  editedWordsRef: { current: EeStorePack };
  onSuccess: () => void;
};

export const CmEditorEERulesPageHead = ({ editedWords, editedWordsRef, onSuccess }: Props) => (
  <TheIconSendButton
    icon="Sent"
    disabled={!editedWords.length}
    className="m-2"
    confirm={
      `${translateEditorBase(EditorLocaleKey.CmEditorSendWords, { n: '' + editedWords.length })}: ` +
      `${editedWords.join(', ')}`
    }
    onSend={() => cmEditorClientTsjrpcMethods.setEEWords({ words: editedWordsRef.current })}
    onSuccess={onSuccess}
  />
);
