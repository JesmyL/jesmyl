import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditorClientInvocatorMethods } from '$cm+editor/basis/lib/cm-editor-invocator.methods';
import { useCmMp3Rules } from '$cm+editor/basis/lib/hooks/useCmMp3Rules';
import { PageCmEditorContainer } from '$cm+editor/basis/ui/PageCmEditorContainer';
import { Mp3RuleEditor } from '$cm+editor/widgets/Mp3RuleEditor';
import { useState } from 'react';
import { CmMp3Rule } from 'shared/api';

export const EditMp3RulesPage = () => {
  const [newRules, updateNewRules] = useState<CmMp3Rule[]>([]);
  const [mp3Rules] = useCmMp3Rules();
  const [isOpenNewRule, setIsOpenNewRule] = useState(false);

  return (
    <PageCmEditorContainer
      className="mp3-rules-redactor"
      headTitle="Редактор MP3 правил"
      content={
        <>
          {mp3Rules.map(rule => {
            return (
              <Mp3RuleEditor
                key={rule.w}
                {...rule}
                onComplete={newRule => cmEditorClientInvocatorMethods.setMp3Rule({ rule: newRule })}
              />
            );
          })}
          {newRules.map(({ w, ...rule }) => {
            return (
              <Mp3RuleEditor
                key={w}
                {...rule}
              />
            );
          })}
          <h2 className="flex flex-gap">
            Новое правило
            {!isOpenNewRule && (
              <LazyIcon
                icon="PlusSignCircle"
                onClick={() => setIsOpenNewRule(true)}
              />
            )}
          </h2>
          {isOpenNewRule && (
            <Mp3RuleEditor
              redact
              newRule
              onComplete={rule => {
                updateNewRules([...newRules, rule]);
                setIsOpenNewRule(false);

                cmEditorClientInvocatorMethods.addMp3Rule({ rule });
              }}
            />
          )}
        </>
      }
    />
  );
};
