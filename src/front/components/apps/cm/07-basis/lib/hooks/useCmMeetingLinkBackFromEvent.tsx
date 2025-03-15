import { PageContainerBackLinkRender } from '#shared/ui/phase-container/PageContainerConfigurer.model';
import { Link } from '@tanstack/react-router';

export const useCmMeetingLinkBackFromEvent = (): PageContainerBackLinkRender => {
  return (linkRef, children) => (
    <Link
      ref={linkRef}
      to="."
      search={prev =>
        ({
          ...(prev as object),
          schw: undefined,
          dayi: undefined,
          eventMi: undefined,
          attKey: undefined,
        }) as object
      }
    >
      {children}
    </Link>
  );
};
