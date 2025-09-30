import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { markdown } from '#shared/config/markdown';
import { mylib } from '#shared/lib/my-lib';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { schDayEventsTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { ReactNode } from 'react';
import {
  customAttUseRights,
  IScheduleWidgetListUnit,
  IScheduleWidgetRole,
  IScheduleWidgetUser,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetAppAttCustomizableValue,
  ScheduleWidgetAppAttCustomizableValueItem,
  ScheduleWidgetAppAttCustomized,
} from 'shared/api';
import styled, { css } from 'styled-components';
import { KeyValueListAttNumberMember } from '../../KeyValueListAttNumberMember';
import { ScheduleKeyValueListAttLiItemDropdown } from '../../LiItemDropdown';

export const ScheduleWidgetAttKeyValueListSubItemsRedact = ({
  isRedact,
  value,
  attKey: key,
  setSelfRedact,
  dayEventAttScopeProps,
  itemMi,
  dropdownUsers,
  dropdownLists,
  dropdownTitles,
  attValue,
  dropdownRoles,
  subItems,
  userR,
  att,
}: {
  attValue: ScheduleWidgetAppAttCustomizableValue;
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps;
  dropdownLists: IScheduleWidgetListUnit[] | undefined;
  dropdownRoles: IScheduleWidgetRole[] | undefined;
  dropdownTitles: string[] | undefined;
  dropdownUsers: IScheduleWidgetUser[];
  isRedact: boolean;
  itemMi: number;
  setSelfRedact: boolean;
  subItems: ((item: ScheduleWidgetAppAttCustomizableValueItem) => ReactNode) | null;
  attKey: ScheduleWidgetAppAttCustomizableValueItem[0];
  value: ScheduleWidgetAppAttCustomizableValueItem[1];
  userR: number;
  att: ScheduleWidgetAppAttCustomized;
}) => {
  return (
    <>
      {(isRedact || value !== '+') &&
        !mylib.isNum(value) &&
        (mylib.isStr(value) ? (
          <StrongField
            $indent={!isRedact && mylib.isBool(key)}
            className={
              `ml-3 ${isRedact ? '-mt-3' : '-mt-9'} mood-for-2 relative z-5 ` +
              (mylib.isBool(key) ? (key ? 'text-x3 opacity-50' : 'text-x3') : '')
            }
            value={value}
            multiline
            isRedact={isRedact}
            isSelfRedact={setSelfRedact}
            onSend={value =>
              schDayEventsTsjrpcClient.setKeyValueAttachmentValue({
                props: dayEventAttScopeProps,
                itemMi,
                value,
              })
            }
          />
        ) : isRedact ? (
          <div>
            {value?.map((val, vali, vala) => {
              return (
                <div key={vali}>
                  {customAttUseRights.checkIsCan(userR, att.U) && (
                    <div className="flex gap-2">
                      <span className="flex self-start">{vali + 1}.</span>
                      {vala.length > 1 && vali > 0 && (
                        <TheIconSendButton
                          className="relative z-15 text-x7"
                          icon="ArrowDataTransferVertical"
                          onSend={() =>
                            schDayEventsTsjrpcClient.moveKeyValueAttachmentListItem({
                              props: dayEventAttScopeProps,
                              itemMi,
                              value: val,
                            })
                          }
                        />
                      )}
                      <TheIconSendButton
                        className="relative z-15 text-xKO"
                        confirm="Удалить пункт?"
                        icon="Delete02"
                        onSend={() =>
                          schDayEventsTsjrpcClient.removeKeyValueAttachmentListItemValue({
                            props: dayEventAttScopeProps,
                            itemMi,
                            value: val,
                          })
                        }
                      />
                    </div>
                  )}
                  <div className="w-full">
                    {mylib.isNum(val) ? (
                      <div className="my-2">
                        <KeyValueListAttNumberMember value={val} />
                      </div>
                    ) : (
                      <StrongEditableField
                        value={val}
                        className="mood-for-2 my-2"
                        isRedact
                        multiline
                        onSend={val => {
                          while (value?.includes(val)) val += '1';

                          return schDayEventsTsjrpcClient.setKeyValueAttachmentListItemValue({
                            props: dayEventAttScopeProps,
                            itemMi,
                            valuei: vali,
                            value: val,
                          });
                        }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            {value && (
              <ScheduleKeyValueListAttLiItemDropdown
                value={value}
                topValues={attValue.values!}
                users={dropdownUsers}
                titles={dropdownTitles}
                lists={dropdownLists}
                roles={dropdownRoles}
                onSend={value =>
                  schDayEventsTsjrpcClient.addKeyValueAttachmentListItem({
                    props: dayEventAttScopeProps,
                    itemMi,
                    value,
                  })
                }
              />
            )}

            {subItems?.([key, value, itemMi])}

            <StrongEditableField
              className="mood-for-2 relative z-5 mt-2"
              placeholder="Новый подпункт"
              isRedact={isRedact}
              isSelfRedact={setSelfRedact}
              multiline
              onSend={val => {
                while (value?.includes(val)) val += '1';

                return schDayEventsTsjrpcClient.addKeyValueAttachmentListItem({
                  props: dayEventAttScopeProps,
                  itemMi,
                  value: val,
                });
              }}
            />
          </div>
        ) : (
          <div>
            {value?.map((val, vali) => {
              return (
                <div
                  key={vali}
                  className="flex gap-2 ml-10"
                >
                  <span className="flex self-start">{vali + 1}.</span>
                  {mylib.isNum(val) ? (
                    <KeyValueListAttNumberMember value={val} />
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: markdown.render(val) }} />
                  )}
                </div>
              );
            })}
          </div>
        ))}
    </>
  );
};

const StrongField = styled(StrongEditableField)<{ $indent: boolean }>`
  ${props =>
    props.$indent &&
    css`
      --indent: 24px;

      .markdownFieldContent {
        ol,
        ul {
          padding-inline-start: 15px;

          > li > ol {
            list-style-type: lower-latin;

            > li > ol {
              list-style-type: lower-roman;

              > li > ol {
                list-style-type: lower-greek;
              }
            }
          }
        }

        > :not(p, div),
        > p:has([prop-src], table),
        > div:has([prop-src], table) {
          &:first-child {
            margin-left: var(--indent);

            &:not([prop-src]) {
              width: calc(100% - var(--indent));
            }
          }
        }

        > *:first-child > :where(p, h1, h2, h3, h4, h5, h6):first-child,
        > p:first-child {
          text-indent: var(--indent);
        }
      }
    `}
`;
