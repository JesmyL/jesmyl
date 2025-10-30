import { Button } from '#shared/components/ui/button';
import { ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { StoragesDateTimestampTitle } from '$storages/entities/DateTimestampTitle';
import { StoragesRackAddField } from '$storages/entities/RackAddField';
import { storagesExcludeFieldTypesForDatedNestedField } from '$storages/shared/const/exclude.const';
import { StoragesIsEditInnersContext, useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { useState } from 'react';
import { StoragesDatesFieldNestedDateFieldMi, StoragesFieldType } from 'shared/model/storages/rack.model';
import { storagesRackCardFieldComponents } from '../const/cardFieldComponents';
import { StoragesRackCardFieldTypeProps } from '../model/model';

const isOpenAddFieldModalAtom = atom(false);

const maxTitleLength = 10;

export const StoragesRackCardFieldDatesNestedDateField = (
  props: StoragesRackCardFieldTypeProps<StoragesFieldType.Dates> & {
    dateMi: StoragesDatesFieldNestedDateFieldMi;
  },
) => {
  const [isSelfEdit, setIsSelfEdit] = useState(false);
  const isCardEdit = useStoragesIsEditInnersContext();
  const cardField = props.cardField?.val?.find(it => it.mi === props.dateMi);

  const isEdit = isSelfEdit || isCardEdit;

  return (
    <>
      <ModalHeader className="flex justify-between">
        <span className="text-x7 flex gap-2">
          <StoragesDateTimestampTitle timestamp={cardField?.ts ?? 1000000000000000} />
          <span>{props.card.title}</span>
        </span>

        {isCardEdit || (
          <Button
            icon={isSelfEdit ? 'CheckmarkCircle01' : 'Edit02'}
            onClick={() => setIsSelfEdit(it => !it)}
          />
        )}
      </ModalHeader>
      <ModalBody className="flex flex-col gap-5 custom-align-items">
        {isEdit ? (
          <TextInput
            label={`Описание (${maxTitleLength} символов)`}
            defaultValue={cardField?.title}
            maxLength={maxTitleLength}
            onChanged={() => {}}
          />
        ) : (
          cardField?.title
        )}

        {props.rackField.fields?.map((nestedRackField, nestedFieldi) => {
          const Component = storagesRackCardFieldComponents[nestedRackField.t];

          const rackField = props.rackField?.fields?.[nestedFieldi];

          if (rackField == null) return;

          return (
            <div key={nestedFieldi}>
              <StoragesIsEditInnersContext value={isEdit}>
                <Component
                  {...props}
                  card={props.card}
                  fieldi={props.fieldi}
                  cardField={cardField?.fields?.[nestedFieldi] as null}
                  rack={props.rack}
                  rackField={rackField}
                  nestedSelectors={{
                    nestedFieldMi: props.dateMi,
                    nestedFieldi,
                    fieldi: -1,
                  }}
                />
              </StoragesIsEditInnersContext>
            </div>
          );
        })}
      </ModalBody>

      <ModalFooter>
        {isEdit && (
          <StoragesRackAddField
            isOpenModalAtom={isOpenAddFieldModalAtom}
            excludeFieldTypes={storagesExcludeFieldTypesForDatedNestedField}
            onAdd={async (type, title) => {
              if (type === StoragesFieldType.Date || type === StoragesFieldType.Dates) return;

              return storagesTsjrpcClient.createRackDefinitionField({
                rackw: props.rack.w,
                title,
                newFieldType: type,
                fieldi: props.fieldi,
              });
            }}
          />
        )}
      </ModalFooter>
    </>
  );
};
