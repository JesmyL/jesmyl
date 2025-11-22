import { TextInput } from '#shared/ui/TextInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { storagesColumnConfigDict } from 'shared/const/storages/storagesColumnConfigDict';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesNestedCellSelectors } from 'shared/model/storages/rack.model';
import { itNNil } from 'shared/utils';
import { storagesColumnEditComponents } from '../const/columnComponents';
import { StoragesColumnEditNestedFields } from './NestedFields';
import { StoragesColumnEditStyleConfigurer } from './StyleConfigurer';

type Props = {
  coli: number;
  rack: StoragesRack;
  grabNode: React.ReactNode;
  nestedSelectors?: StoragesNestedCellSelectors;
};

export const TheStoragesColumnEditColumn = (props: Props) => {
  const column =
    props.nestedSelectors?.nestedColi == null
      ? props.rack.cols[props.coli]
      : props.rack.cols[props.coli].cols?.[props.nestedSelectors.nestedColi];

  if (column == null) return;

  const Component = storagesColumnEditComponents[column.t];
  const usedValues =
    props.nestedSelectors?.nestedColi != null
      ? []
      : Array.from(
          new Set(
            props.rack.cards.map(card =>
              storagesColumnConfigDict[column.t].makeStringValue(
                card.row?.[props.coli] as never,
                column as never,
                props.rack,
              ),
            ),
          ),
        )
          .filter(itNNil)
          .slice(0, 3)
          .map(value => {
            return (
              value && (
                <span
                  key={value}
                  className="bg-x2 m-0.5 px-1 rounded-sm"
                >
                  {value}
                </span>
              )
            );
          });

  return (
    <div className="ring-2 rounded-sm my-5 p-2">
      <div className="flex justify-between w-full">
        <div className="flex gap-2">
          <LazyIcon icon={storagesColumnConfigDict[column.t].icon} />
          {storagesColumnConfigDict[column.t].typeTitle}
        </div>
        {props.grabNode}
      </div>

      <TextInput
        label="Название"
        defaultValue={column.title}
        strongDefaultValue
        onChanged={title =>
          storagesTsjrpcClient.renameColumn({
            coli: props.coli,
            rackw: props.rack.w,
            title,
            ...props.nestedSelectors,
          })
        }
      />

      {!usedValues.length || (
        <div className="mt-5">
          Значения:
          {usedValues}
        </div>
      )}

      <div className="mt-5">
        <Component
          column={column as never}
          rack={props.rack}
          coli={props.coli}
          nestedSelectors={props.nestedSelectors}
        />
      </div>

      <StoragesColumnEditStyleConfigurer
        rack={props.rack}
        coli={props.coli}
      />

      {column.cols && (
        <StoragesColumnEditNestedFields
          column={column}
          rack={props.rack}
          coli={props.coli}
        />
      )}
    </div>
  );
};
