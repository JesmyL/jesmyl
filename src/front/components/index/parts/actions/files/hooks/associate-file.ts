import { mylib } from 'front/utils';
import { useMemo } from 'react';
import { MyFileType } from 'shared/api';
import { makeRegExp } from 'shared/utils';
import { useIndexFileAssociations } from '../../../../atoms';

export const useAssociateTheFileType = () => {
  const associates = useIndexFileAssociations();
  return useMemo(() => {
    return (file: File): MyFileType => {
      const ext = file.name.replace(makeRegExp('/.*?\\.([^.]+$)/'), '$1').toLowerCase();
      return (associates && mylib.keys(associates).find(type => associates[type].extensions.includes(ext))) ?? 'other';
    };
  }, [associates]);
};
