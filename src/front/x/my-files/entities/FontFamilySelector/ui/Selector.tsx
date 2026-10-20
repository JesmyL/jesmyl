import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { useLiveQuery } from 'dexie-react-hooks';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { MyFileBoxId, MyFileType } from 'x/my-files';
import { myFilesIDB } from 'x/my-files/shared/state/idb';

interface Props {
  fileId?: MyFileBoxId | null;
  onSelect: (bgFileId: MyFileBoxId) => void;
}

export const MyFilesFontFamilySelector = ({ fileId: bgFileId, onSelect }: Props) => {
  const fonts = useLiveQuery(() => myFilesIDB.tb.files.where({ type: MyFileType.Font }).toArray());

  return (
    <Dropdown
      id={bgFileId ?? undefined}
      items={fonts?.map(({ file, id }) => ({ id, title: file.name })) ?? []}
      undTitle={translateBase(BaseLocaleKey.ByDefault)}
      onSelectId={onSelect}
    />
  );
};
