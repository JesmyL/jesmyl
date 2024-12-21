import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CmMp3Rule } from 'shared/api';
import { makeRegExp } from 'shared/utils';
import { useExerExec } from '../../../../../../../complect/exer/hooks/useExer';
import KeyboardInput from '../../../../../../../complect/keyboard/KeyboardInput';
import IconButton from '../../../../../../../complect/the-icon/IconButton';
import { IconTickDouble02StrokeRounded } from '../../../../../../../complect/the-icon/icons/tick-double-02';
import EditContainerCorrectsInformer from '../../../edit-container-corrects-informer/EditContainerCorrectsInformer';
import { useEditableCols } from '../../useEditableCols';
import { EditableCom } from '../com/EditableCom';
import ComAudio from './audio/ComAudio';
import ObserveUrlResource from './audio/ObserveUrlResource';

export default function NewComposition({ close, com }: { close: () => void; com: EditableCom }) {
  const navigate = useNavigate();
  const cols = useEditableCols();
  const exec = useExerExec();
  const [value, setValue] = useState('');
  const [name, setName] = useState('');
  const [isTakeName, setIsTakeName] = useState(true);
  const [innerHTML, setInnerHTML] = useState('');
  const [mp3Rule, setMp3Rule] = useState<CmMp3Rule | und>();

  const setTextAsValue = (value: string) => {
    setValue(value);
    if (isTakeName) {
      const name = com.takeCorrectName(value);
      com.rename(name);
      setName(name);
    }
  };

  return (
    <>
      <div
        className="new-composition"
        onClick={event => event.stopPropagation()}
      >
        <div className="title">Новая песня</div>

        <EditContainerCorrectsInformer
          className="full-width"
          corrects={com.col.corrects.name}
        >
          <div className="flex full-width">
            <span className="margin-gap-h">Название </span>
            <div className="full-width">
              <KeyboardInput
                className="full-width"
                value={name}
                onInput={() => setIsTakeName(false)}
                onChange={value => {
                  setName(com.correctName(value));
                  exec(com.rename(value, correctName => exec(correctName && setName(correctName))));
                }}
              />
            </div>
          </div>
        </EditContainerCorrectsInformer>
        <ObserveUrlResource
          availableWithTextQuery
          onSuccess={({ html, rule }) => {
            const div = document.createElement('div');
            div.innerHTML = html;
            setInnerHTML(html);
            setMp3Rule(rule);
            if (rule.textQuery) {
              const pre: HTMLPreElement | null = div.querySelector(rule.textQuery);
              if (pre) {
                if (rule.isHTML) setTextAsValue(pre.innerHTML.replace(makeRegExp('/<(\\/ ?)?br( ?\\/)?>/g'), '\n'));
                else setTextAsValue(pre.innerText);
              }
            }
          }}
        />
        <KeyboardInput
          value={value}
          className="text-heap-textarea full-width"
          multiline
          withoutCloseButton
          placeholder="Начни писать или вставь текст для создания песни"
          onChange={setTextAsValue}
        />
        {innerHTML && (
          <ComAudio
            topCom={com}
            topHTML={innerHTML}
            topMp3Rule={mp3Rule}
          />
        )}
        <IconButton
          Icon={IconTickDouble02StrokeRounded}
          className="parse-com-data-button pointer margin-big-gap"
          onClick={() => {
            if (cols?.addCom(com)) {
              com.create();
              com.parseBlocks(value);
              navigate('' + com.wid);
              close();
              exec();
            }
          }}
        />
      </div>
    </>
  );
}
