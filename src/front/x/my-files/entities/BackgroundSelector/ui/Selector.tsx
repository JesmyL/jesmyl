import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { useLiveQuery } from 'dexie-react-hooks';
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
      undTitle="По умолчанию"
      onSelectId={onSelect}
    />
  );
};
