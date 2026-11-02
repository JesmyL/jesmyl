import { createFileRoute } from '@tanstack/react-router';
import { CmAudioTail, parseCmAudioTail } from 'shared/api';
import { checkIsString } from 'shared/utils/checkIs';

export const Route = createFileRoute('/cm/edit/coms/$comw/$tab/')({
  validateSearch: (search): { src?: CmAudioTail } => ({
    src: (checkIsString(search.src) && parseCmAudioTail(search.src)) || undefined,
  }),
});
