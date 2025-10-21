import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditorClientTsjrpcMethods } from '$cm+editor/shared/lib/cm-editor.tsjrpc.methods';
import { useCmMp3Rules } from '$cm+editor/shared/lib/useCmMp3Rules';
import { PageCmEditorContainer } from '$cm+editor/shared/ui/PageCmEditorContainer';
import { CmEditorMp3RuleEditor } from '$cm+editor/widgets/mp3-rule';
import { useState } from 'react';
import { CmMp3Rule } from 'shared/api';

export const CmEditorMp3RulesPage = () => {
  const [newRules, updateNewRules] = useState<CmMp3Rule[]>([]);
  const [mp3Rules] = useCmMp3Rules();
  const [isOpenNewRule, setIsOpenNewRule] = useState(false);
  const checkAccess = useCheckUserAccessRightsInScope();
  const isCanUpdate = checkAccess('cm', 'MP3', 'U');

  return (
    <PageCmEditorContainer
      className="mp3-rules-redactor"
      headTitle="Редактор MP3 правил"
      content={
        <>
          {mp3Rules.map(rule => {
            return (
              <CmEditorMp3RuleEditor
                key={rule.w}
                {...rule}
                onComplete={newRule => cmEditorClientTsjrpcMethods.setMp3Rule({ rule: newRule })}
                isCanRedact={isCanUpdate}
              />
            );
          })}

          {checkAccess('cm', 'MP3', 'C') && (
            <>
              {newRules.map(({ w, ...rule }) => {
                return (
                  <CmEditorMp3RuleEditor
                    key={w}
                    {...rule}
                  />
                );
              })}
              <h2 className="flex gap-2">
                Новое правило
                {!isOpenNewRule && (
                  <LazyIcon
                    icon="PlusSignCircle"
                    onClick={() => setIsOpenNewRule(true)}
                  />
                )}
              </h2>
            </>
          )}
          {isOpenNewRule && (
            <CmEditorMp3RuleEditor
              redact
              newRule
              onComplete={rule => {
                updateNewRules([...newRules, rule]);
                setIsOpenNewRule(false);

                cmEditorClientTsjrpcMethods.addMp3Rule({ rule });
              }}
            />
          )}
        </>
      }
    />
  );
};
