import { useInvocatedValue } from '#basis/lib/useInvocatedValue';
import { cmEditorClientInvocatorMethods } from '../cm-editor-invocator.methods';

export const useCmMp3Rules = () => {
  return useInvocatedValue([], ({ aborter }) => cmEditorClientInvocatorMethods.getMp3RulesList({ aborter }), []);
};
