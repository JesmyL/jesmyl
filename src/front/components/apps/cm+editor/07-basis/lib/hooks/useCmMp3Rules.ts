import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { cmEditorClientTsjrpcMethods } from '../cm-editor.tsjrpc.methods';

export const useCmMp3Rules = () => {
  return useInvocatedValue(
    [],
    ({ aborter }) => cmEditorClientTsjrpcMethods.getMp3RulesList(undefined, { aborter }),
    [],
  );
};
