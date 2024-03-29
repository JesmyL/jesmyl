import { useReducer, useRef } from 'react';
import mylib from '../../../../../complect/my-lib/MyLib';
import PhaseIndexContainer from '../../../complect/PhaseIndexContainer';
import { MyFilesTypeBox } from './complect/MyFilesTypeBox';
import { useMyFilesAssociates } from './hooks/associates';
import { useAddMyFileOnDrop, useAddMyFileOnFileChange } from './hooks/on-add-file';

const onDragOver: CallbackPreventer = event => event.preventDefault();
const forceUpdater = (it: number) => it + 1;

export default function IndexMyFiles() {
  const [updates, forceUpdate] = useReducer(forceUpdater, 0);
  const onDrop = useAddMyFileOnDrop(forceUpdate);
  const onChange = useAddMyFileOnFileChange(forceUpdate);
  const inputRef = useRef<HTMLInputElement>(null);
  const associates = useMyFilesAssociates();

  return (
    <PhaseIndexContainer
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
