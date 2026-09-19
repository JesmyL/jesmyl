import { electronBasicTsjrpcClient } from '#basis/tsjrpc.electron/basic';
import { Button } from '#shared/components';
import { electronWorkDirAtom } from '#shared/state/electron.atoms';
import { useAtomValue } from 'atomaric';
import { electronAppName } from 'shared/const/electron';

export const ElectronWorkDir = () => {
  const workDir = useAtomValue(electronWorkDirAtom);

  if (!workDir) {
    const setDir = (dir: string | nil) => {
      if (!dir) return;
      electronWorkDirAtom.set(dir);
    };

    return (
      <div className="full-size flex gap-3 items-center justify-center">
        Рабочая папка не выбрана
        <Button
          icon="FolderOpen"
          title="Выбрать папку"
          onClick={async () => {
            const dir = await electronBasicTsjrpcClient.selectDir({});
            setDir(dir);
          }}
        />
        <Button
          icon="FolderSearch"
          title="Выбрать папку"
          onClick={async () => {
            const dir = await electronBasicTsjrpcClient.selectDir({});
            setDir(dir);
          }}
        />
        <Button
          icon="FolderAdd"
          title={`Выбрать папку и создать в ней рабочую "${electronAppName}"`}
          onClick={async () => {
            const dir = await electronBasicTsjrpcClient.selectDir({ create: electronAppName });
            setDir(dir);
          }}
        />
      </div>
    );
  }

  return workDir;
};
