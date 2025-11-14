import { Button } from '#shared/components/ui/button';
import { mylib } from '#shared/lib/my-lib';
import { questionerIDB } from '$q/shared/state/qIdb';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { useLiveQuery } from 'dexie-react-hooks';
import { QuestionerBlankWid, QuestionerTemplateId } from 'shared/model/q';
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
      {template && blank && !template.hidden && mylib.keys(blank.tmp).length > 1 && (
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
