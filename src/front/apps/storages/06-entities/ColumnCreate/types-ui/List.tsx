import { StoragesColumnType, StoragesDicti } from 'shared/model/storages/rack.model';
import { StoragesColumnCreateTypeProps } from '../model/model';
import { StoragesColumnCreateSelectDictionary } from '../sub-ui/SelectDictionary';

export const StoragesColumnCreateOfTypeList = (props: StoragesColumnCreateTypeProps<StoragesColumnType.List>) => {
  return (
    <>
      <StoragesColumnCreateSelectDictionary
        id={props.colCustomProps.di ?? StoragesDicti.zIndex}
        rack={props.rack}
        onSelectId={id => {
          props.colCustomProps.di = id;
        }}
      />
    </>
  );
};
