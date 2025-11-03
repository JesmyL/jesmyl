import { Button } from '#shared/components/ui/button';
import { TextInput } from '#shared/ui/TextInput';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useState } from 'react';
import { storagesColumnConfigDict } from 'shared/const/storages/storagesColumnConfigDict';
import { StoragesRack } from 'shared/model/storages/list.model';
import { itNIt } from 'shared/utils';
import { storagesColumnEditComponents } from '../const/columnComponents';
import { StoragesColumnEditStyleConfigurer } from './StyleConfigurer';

type Props = {
  coli: number;
  rack: StoragesRack;
  grabNode: React.ReactNode;
};

export const TheStoragesColumnEditColumn = (props: Props) => {
  const column = props.rack.cols[props.coli];
  const Component = storagesColumnEditComponents[column.t];
  const [isOpenStypesConfig, setIsOpenStypesConfig] = useState(false);

  return (
    <div className="ring-2 rounded-sm my-5 p-2">
      <div className="flex justify-end w-full">{props.grabNode}</div>
      <TextInput
        label="Название"
        defaultValue={column.title}
        strongDefaultValue
        onChanged={title => storagesTsjrpcClient.renameColumn({ coli: props.coli, rackw: props.rack.w, title })}
      />

      <div>Тип поля: {storagesColumnConfigDict[column.t].typeTitle}</div>

      <div>
        Значения:
        {props.rack.cards.map(card => {
          const value = storagesColumnConfigDict[column.t].makeStringValue(card.row?.[props.coli] as never);

          return (
            value && (
              <span
                key={card.mi}
                className="bg-x2 m-0.5 px-1 rounded-sm"
              >
                {value}
              </span>
            )
          );
        })}
      </div>

      <div className="flex gap-2">
        Стили
        <Button
          icon={isOpenStypesConfig ? 'ArrowUp01' : 'ArrowDown01'}
          onClick={() => setIsOpenStypesConfig(itNIt)}
        />
      </div>
      {isOpenStypesConfig && (
        <StoragesColumnEditStyleConfigurer
          rack={props.rack}
          coli={props.coli}
        />
      )}

      <Component
        column={column as never}
        rack={props.rack}
        coli={props.coli}
      />
    </div>
  );
};
