import { mylib } from 'front/utils';
import { useReducer, useRef } from 'react';
import PhaseContainerConfigurer from '../../../../../07-shared/ui/phase-container/PhaseContainerConfigurer';
import { useIndexFileAssociations } from '../../../atoms';
import { MyFilesTypeBox } from './complect/MyFilesTypeBox';
import { useAddMyFileOnDrop, useAddMyFileOnFileChange } from './hooks/on-add-file';

const onDragOver: DefaultPreventer = event => event.preventDefault();
const forceUpdater = (it: number) => it + 1;

export default function IndexMyFiles() {
  const [updates, forceUpdate] = useReducer(forceUpdater, 0);
  const onDrop = useAddMyFileOnDrop(forceUpdate);
  const onChange = useAddMyFileOnFileChange(forceUpdate);
  const inputRef = useRef<HTMLInputElement>(null);
  const associates = useIndexFileAssociations();

  return (
    <PhaseContainerConfigurer
      className=""
      headTitle="Мои файлы"
      content={
        <div
          className="full-height full-width"
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
            className="flex flex-max padding-gap bgcolor--6 color--2"
            onClick={() => inputRef.current?.click()}
          >
            Загрузить файлы
          </div>
          {!updates}
          {associates &&
            mylib.keys(associates).map(type => (
              <MyFilesTypeBox
                key={type}
                type={type}
              />
            ))}
        </div>
      }
    />
  );
}
