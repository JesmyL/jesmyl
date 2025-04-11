import { HTMLAttributes } from 'react';

export const TheIconWrapper = ({
  withoutAnimation,
  className = '',
  ...attrs
}: HTMLAttributes<HTMLOrSVGElement> & { withoutAnimation?: boolean }) => {
  return (
    <svg
      {...attrs}
      className={`${className} the-icon${withoutAnimation !== true ? ' with-animation' : ''}`}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    />
  );
};
