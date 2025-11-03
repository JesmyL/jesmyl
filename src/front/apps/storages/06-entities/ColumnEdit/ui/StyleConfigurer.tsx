import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { storagesStylePropKeysMatrix, storagesStypePropTitles } from 'shared/const/storages/styleProps.config';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesRackColumn } from 'shared/model/storages/rack.model';
import { StoragesColumnUiDict } from 'shared/model/storages/ui.model';

const colorChangeAtom = atom<Parameters<typeof storagesTsjrpcClient.editColumnType>[0] | null>(null);

colorChangeAtom.subscribe(props => {
  if (props == null) return;
  storagesTsjrpcClient.editColumnType(props);
});

export const StoragesColumnEditStyleConfigurer = (props: { rack: StoragesRack; coli: number }) => {
  const column = props.rack.cols[props.coli];

  return (
    <>
      {mylib.keys(storagesStypePropTitles).map(propKey => {
        const styleKeyList = Array.from(storagesStylePropKeysMatrix[propKey]);
        const styleKey = column.uil?.find(key => storagesStylePropKeysMatrix[propKey].has(+key));

        return (
          <div
            key={propKey}
            className="flex gap-3 my-3 ml-3"
          >
            {storagesStypePropTitles[propKey]}
            <Dropdown
              id={!mylib.isStr(styleKey) ? styleKey : null}
              nullTitle="Обычный"
              items={styleKeyList.map((id, idi) => ({
                id,
                title: <span className="text-x7">{['Маленький', 'Большой', 'Огромный'][idi]}</span>,
              }))}
              onSelectId={styleKey =>
                storagesTsjrpcClient.editColumnType({
                  rackw: props.rack.w,
                  coli: props.coli,
                  list: { key: propKey, value: styleKey },
                })
              }
            />
          </div>
        );
      })}

      <ColorChanger
        title="Цвет текста:"
        propKey="text"
        coli={props.coli}
        column={column}
        rack={props.rack}
      />

      <ColorChanger
        title="Цвет фона:"
        propKey="bg"
        coli={props.coli}
        column={column}
        rack={props.rack}
      />
    </>
  );
};

const ColorChanger = (props: {
  title: string;
  column: StoragesRackColumn;
  coli: number;
  rack: StoragesRack;
  propKey: keyof StoragesColumnUiDict;
}) => {
  return (
    <div className="flex gap-3">
      {props.title}
      <input
        type="color"
        value={props.column.uid?.[props.propKey] || '#fff'}
        onChange={event =>
          colorChangeAtom.setDeferred({
            coli: props.coli,
            rackw: props.rack.w,
            dict: { [props.propKey]: event.currentTarget.value },
          })
        }
      />
      <Button
        icon="Cancel01"
        onClick={() =>
          colorChangeAtom.set({
            coli: props.coli,
            rackw: props.rack.w,
            dict: { [props.propKey]: null },
          })
        }
      />
    </div>
  );
};
