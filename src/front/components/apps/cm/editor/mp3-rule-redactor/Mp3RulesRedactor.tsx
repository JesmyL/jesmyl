import { LazyIcon } from 'front/complect/the-icon/LazyIcon';
import { useState } from 'react';
import { CmMp3Rule } from 'shared/api';
import { cmEditorClientInvocatorMethods } from '../cm-editor-invocator.methods';
import PhaseCmEditorContainer from '../phase-editor-container/PhaseCmEditorContainer';
import Mp3RuleEditor from './Mp3RuleEditor';
import { useCmMp3Rules } from './useCmMp3Rules';

export default function Mp3RulesRedactor() {
  const [newRules, updateNewRules] = useState<CmMp3Rule[]>([]);
  const mp3Rules = useCmMp3Rules();
  const [redactRules, updateRedactRules] = useState(mp3Rules);
  const [isOpenNewRule, setIsOpenNewRule] = useState(false);

  return (
    <PhaseCmEditorContainer
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
}
