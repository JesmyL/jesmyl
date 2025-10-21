import { mylib } from '#shared/lib/my-lib';
import { useIndexFileAssociations } from '$index/shared/state';
import { useMemo } from 'react';
import { makeRegExp } from 'regexpert';
import { MyFileType } from 'shared/api';

export const useIndexMyFilesTypeBoxAssociateTheFileType = () => {
  const associates = useIndexFileAssociations();
  return useMemo(() => {
    return (file: File): MyFileType => {
      const ext = file.name.replace(makeRegExp('/.*?\\.([^.]+$)/'), '$1').toLowerCase();
      return (associates && mylib.keys(associates).find(type => associates[type].extensions.includes(ext))) ?? 'other';
    };
  }, [associates]);
};
