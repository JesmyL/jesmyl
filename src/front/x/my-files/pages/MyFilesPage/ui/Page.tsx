import { translateBase } from '#basis/locale';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { objectValues } from 'shared/utils/object.utils';
import { MyFilesUploader } from 'x/my-files/entities';
import { FileListByType } from 'x/my-files/entities/FileListByType';
import { myFilesConfig } from 'x/my-files/shared/const/myFiles';

export const MyFilesPage = () => {
  return (
    <PageContainerConfigurer
      className=""
      headTitle={translateBase(BaseLocaleKey.MyFiles)}
      content={
        <MyFilesUploader withButton>
          {objectValues(myFilesConfig).map(({ type }) => (
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
