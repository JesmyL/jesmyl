import { StoragesRackDefinitionField } from 'shared/model/storages/rack.model';

export const StoragesRackFieldDefinition = ({ field }: { field: StoragesRackDefinitionField }) => {
  return <div>{field.title}</div>;
};
