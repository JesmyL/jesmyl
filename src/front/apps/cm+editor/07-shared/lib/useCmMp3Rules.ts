import { QueryKey } from '#basis/model/QueryKey.model';
import { useQuery } from '@tanstack/react-query';
import { cmEditorClientTsjrpcMethods } from './cm-editor.tsjrpc.methods';

export const useCmMp3Rules = () => {
  return useQuery({
    queryKey: [QueryKey.CmMp3Rules],
    queryFn: () => cmEditorClientTsjrpcMethods.getMp3RulesList(),
  });
};
