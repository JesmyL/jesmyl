import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmEditorClientInvocatorMethods } from '$cm/editor/lib/cm-editor-invocator.methods';
import { useCmMp3Rules } from '$cm/editor/lib/hooks/useCmMp3Rules';
import { Mp3RuleEditor } from '$cm/editor/pages/mp3-rule/ui/Mp3RuleEditor';
import { PageCmEditorContainer } from '$cm/editor/ui/PageCmEditorContainer';
import { useState } from 'react';
import { CmMp3Rule } from 'shared/api';

export const EditMp3RulesPage = () => {
  const [newRules, updateNewRules] = useState<CmMp3Rule[]>([]);
  const [mp3Rules] = useCmMp3Rules();
  const [redactRules, updateRedactRules] = useState(mp3Rules);
  const [isOpenNewRule, setIsOpenNewRule] = useState(false);

  return (
    <PageCmEditorContainer
      className="mp3-rules-redactor"
      headTitle="Редактор MP3 правил"
      content={
        <>
          {redactRules.map(rule => {
            return (
              <Mp3RuleEditor
                key={rule.w}
                {...rule}
                onComplete={newRule => {
                  const index = redactRules.findIndex(({ w }) => rule.w === w);
                  if (index > -1) {
                    const newRedacts = [...redactRules];
                    newRedacts.splice(index, 1, newRule);
                    updateRedactRules(newRedacts);

                    cmEditorClientInvocatorMethods.setMp3Rule(null, newRule);
                  }
                }}
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

                cmEditorClientInvocatorMethods.addMp3Rule(null, rule);
              }}
            />
          )}
        </>
      }
    />
  );
};
