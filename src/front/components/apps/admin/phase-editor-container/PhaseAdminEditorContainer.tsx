import { useShowExerLookIcon } from '../../../../complect/exer/hooks/look-icon';
import { PhaseContainerProps } from '../../../../complect/phase-container/PhaseContainerConfigurer.model';
import { adminExer } from '../adminExer';
import PhaseAdminContainer from '../complect/PhaseAdmContainer';
import './PhaseAdminEditorContainer.scss';

export default function PhaseAdminEditorContainer(props: PhaseContainerProps) {
  return (
    <PhaseAdminContainer
      {...props}
      className={`phase-admin-editor-container ${props.className}`}
      head={
        <>
          {props.head}
          {useShowExerLookIcon(adminExer)}
        </>
      }
    />
  );
}
