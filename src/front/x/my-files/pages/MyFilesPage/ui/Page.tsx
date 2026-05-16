import { MyLib } from '#shared/lib/my-lib';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { MyFilesUploader } from 'x/my-files/entities';
import { FileListByType } from 'x/my-files/entities/FileListByType';
import { myFilesConfig } from 'x/my-files/shared/const/myFiles';

export const MyFilesPage = () => {
  return (
    <PageContainerConfigurer
      className=""
      headTitle="Мои файлы"
      content={
        <MyFilesUploader withButton>
          {MyLib.values(myFilesConfig).map(({ type }) => (
            <FileListByType
              key={type}
              type={type}
            />
          ))}
        </MyFilesUploader>
      }
    />
  );
};
