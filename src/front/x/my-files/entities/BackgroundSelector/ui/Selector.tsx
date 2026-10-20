import { translateBase } from '#basis/locale';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { useLiveQuery } from 'dexie-react-hooks';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { MyFileBoxId, MyFileType } from 'x/my-files';
import { myFilesIDB } from 'x/my-files/shared/state/idb';

interface Props {
  bgFileId?: MyFileBoxId;
  onSelect: (id: MyFileBoxId) => void;
}

export const MyFileBackgroundSelector = ({ bgFileId, onSelect }: Props) => {
  const bgFileBoxes = useLiveQuery(() =>
    myFilesIDB.tb.files.where('type').anyOf([MyFileType.Image, MyFileType.Video]).toArray(),
  );

  return (
    <Dropdown
      id={bgFileId}
      items={bgFileBoxes?.map(({ file, id }) => ({ id, title: file.name })) ?? []}
      undTitle={translateBase(BaseLocaleKey.ByDefault)}
      onSelectId={onSelect}
    />
  );
};
