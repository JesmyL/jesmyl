import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { useState } from 'react';
import { storagesStylePropKeysMatrix, storagesStypePropTitles } from 'shared/const/storages/styleProps.config';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesColumnType, StoragesRackColumn } from 'shared/model/storages/rack.model';
import { StoragesColumnUiDict } from 'shared/model/storages/ui.model';
import { itNIt } from 'shared/utils';
import { checkIsString } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';

const colorChangeAtom = atom<Parameters<typeof storagesTsjrpcClient.editColumnType>[0] | null>(null);

colorChangeAtom.subscribe(props => {
  if (props == null) return;
  storagesTsjrpcClient.editColumnType(props);
});

export const StoragesColumnEditStyleConfigurer = (props: { rack: StoragesRack; coli: number }) => {
  const [isOpenStypesConfig, setIsOpenStypesConfig] = useState(false);
  const column = props.rack.cols[props.coli];

  return (
    <>
      <Button
        icon={isOpenStypesConfig ? 'ArrowUp01' : 'ArrowDown01'}
        onClick={() => setIsOpenStypesConfig(itNIt)}
      >
        {translateBase(BaseLocaleKey.StoragesStyles)}
      </Button>

      {isOpenStypesConfig && (
        <>
          {objectKeys(storagesStypePropTitles).map(propKey => {
            const styleKeyList = Array.from(storagesStylePropKeysMatrix[propKey]);
            const styleKey = column.uil?.find(key => storagesStylePropKeysMatrix[propKey].has(+key));

            return (
              <div
                key={propKey}
                className="flex gap-3 my-3 ml-3"
              >
                {storagesStypePropTitles[propKey]}
                <Dropdown
                  id={!checkIsString(styleKey) ? styleKey : null}
                  nullTitle={translateBase(BaseLocaleKey.StoragesUsual)}
                  items={styleKeyList.map((id, idi) => ({
                    id,
                    title: (
                      <span className="text-x7">
                        {translateBase(
                          it =>
                            [
                              it[BaseLocaleKey.StoragesSmall],
                              it[BaseLocaleKey.StoragesBig],
                              it[BaseLocaleKey.StoragesHuge],
                            ][idi],
                        )}
                      </span>
                    ),
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
            title={translateBase(BaseLocaleKey.StoragesTextColor)}
            propKey="text"
            coli={props.coli}
            column={column}
            rack={props.rack}
          />

          <ColorChanger
            title={translateBase(BaseLocaleKey.StoragesBackgroundColor)}
            propKey="bg"
            coli={props.coli}
            column={column}
            rack={props.rack}
          />
        </>
      )}
    </>
  );
};

const ColorChanger = <Type extends StoragesColumnType>(props: {
  title: string;
  column: StoragesRackColumn<Type>;
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
