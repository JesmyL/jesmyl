import { electronWorkDirAtom } from '#shared/state/electron.atoms';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { useAtomValue } from 'atomaric';
import { workDirPresetFolders } from '../lib/electronWorkDir';
import { useWorkDirPack } from '../lib/useWorkDirPack';

interface Props {
  bgFilePath?: string;
  onSelect: (filePath: string) => void;
}

/** Compact Electron background picker — the WorkDir's image/video files, without the full folder browser. */
export const ElectronWorkDirBackgroundSelector = ({ bgFilePath, onSelect }: Props) => {
  const workDir = useAtomValue(electronWorkDirAtom);
  const imagePack = useWorkDirPack(workDir ? `${workDir}/${workDirPresetFolders.image}` : '', 0);
  const videoPack = useWorkDirPack(workDir ? `${workDir}/${workDirPresetFolders.video}` : '', 0);

  const items = [...(imagePack?.files ?? []), ...(videoPack?.files ?? [])].map(file => ({
    id: file.path,
    title: file.name,
  }));

  return (
    <Dropdown
      id={bgFilePath}
      items={items}
      undTitle="По умолчанию"
      onSelectId={onSelect}
    />
  );
};
