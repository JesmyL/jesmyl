import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { questionerIDB } from '$q/shared/state/qIdb';
import { questionerAdminTsjrpcClient } from '$q/shared/tsjrpc/admin.tsjrpc';
import { useLiveQuery } from 'dexie-react-hooks';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
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
      <div>{translateBase(BaseLocaleKey.QuestionerVisibilityControl)}</div>
      <div className="mt-10">
        {translateBase(BaseLocaleKey.QuestionerSurvey)} <span className="text-x7"> {template?.title}</span>
      </div>

      <Button
        icon={template?.hidden ? 'ViewOffSlash' : 'View'}
        className={twMerge(template?.hidden && 'text-x7', 'my-5')}
        onClick={() => questionerAdminTsjrpcClient.switchTemplateHiddenSign({ blankw, templateId })}
      >
        {translateBase(it => (template?.hidden ? it[BaseLocaleKey.QuestionerMakeVisible] : it[BaseLocaleKey.QuestionerMakeInvisible]))}
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
