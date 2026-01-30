import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { PageContainerProps } from '#shared/ui/phase-container/PageContainerConfigurer.model';
import { twMerge } from 'tailwind-merge';

export const PageCmEditorContainer = (props: PageContainerProps) => {
  return (
    <PageContainerConfigurer
      {...props}
      className={twMerge('phase-cm-editor-container', props.className)}
    />
  );
};
