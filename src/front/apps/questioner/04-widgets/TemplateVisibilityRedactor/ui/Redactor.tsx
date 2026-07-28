import { Button } from '#shared/components/ui/button';
import { questionerIDB } from '$q/shared/state/qIdb';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { useLiveQuery } from 'dexie-react-hooks';
import { QuestionerBlankWid, QuestionerTemplateId } from 'shared/model/q';
import { objectLength } from 'shared/utils/object.utils';
import { twMerge } from 'tailwind-merge';
import { QuestionerTemplateVisibilityRedactorModalBodyInner } from './ModalBodyInner';

export const QuestionerTemplateVisibilityRedactor = ({
  blankw,
  templateId,
}: {
  blankw: QuestionerBlankWid;
  templateId: QuestionerTemplateId;
}) => {
  const blank = useLiveQuery(() => questionerIDB.tb.blanks.get(blankw), [blankw]);
  const template = blank?.tmp[templateId];

  return (
    <>
      <div>Управление видимостью</div>
      <div className="mt-10">
        Вопрос <span className="text-x7"> {template?.title}</span>
      </div>

      <Button
        icon={template?.hidden ? 'ViewOffSlash' : 'View'}
        className={twMerge(template?.hidden && 'text-x7', 'my-5')}
        onClick={() => questionerAdminTsjrpcClient.switchTemplateHiddenSign({ blankw, templateId })}
      >
        Сделать {template?.hidden ? 'видимым' : 'невидимым'}
      </Button>
      {template && blank && !template.hidden && objectLength(blank.tmp) > 1 && (
        <QuestionerTemplateVisibilityRedactorModalBodyInner
          blankw={blankw}
          templateId={templateId}
          template={template}
          blank={blank}
        />
      )}
    </>
  );
};
