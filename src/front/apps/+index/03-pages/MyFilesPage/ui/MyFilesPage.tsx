import { mylib } from '#shared/lib/my-lib';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IndexMyFilesTypeBox } from '$index/entities/MyFilesTypeBox';
import {
  useIndexMyFilesTypeBoxAddFileOnDrop,
  useIndexMyFilesTypeBoxAddFileOnFileChange,
} from '$index/entities/MyFilesTypeBox/lib/on-add-file';
import { useIndexFileAssociations } from '$index/shared/state';
import { useReducer, useRef } from 'react';

const onDragOver: DefaultPreventer = event => event.preventDefault();
const forceUpdater = (it: number) => it + 1;

export function IndexMyFilesPage() {
  const [updates, forceUpdate] = useReducer(forceUpdater, 0);
  const onDrop = useIndexMyFilesTypeBoxAddFileOnDrop(forceUpdate);
  const onChange = useIndexMyFilesTypeBoxAddFileOnFileChange(forceUpdate);
  const inputRef = useRef<HTMLInputElement>(null);
  const associates = useIndexFileAssociations();

  return (
    <PageContainerConfigurer
      className=""
      headTitle="Мои файлы"
      content={
        <div
          className="h-full w-full"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <input
            type="file"
            onChange={onChange}
            hidden
            ref={inputRef}
          />
          <div
            className="flex flex-max p-2 bg-x6 text-x2"
            onClick={() => inputRef.current?.click()}
          >
            Загрузить файлы
          </div>
          {!updates}
          {associates &&
            mylib.keys(associates).map(type => (
              <IndexMyFilesTypeBox
                key={type}
                type={type}
              />
            ))}
        </div>
      }
    />
  );
}
