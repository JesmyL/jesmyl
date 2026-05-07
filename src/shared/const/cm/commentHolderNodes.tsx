import { retNull } from 'shared/utils';

export const commentHolderNodes = Array.from({ length: 4 }, retNull).map((_, i) => (
  <span
    key={i}
    className="comment-holder"
  />
));
