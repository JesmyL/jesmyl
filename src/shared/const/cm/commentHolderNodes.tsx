import { arrayByLength } from 'shared/utils/object.utils';

export const commentHolderNodes = arrayByLength(4, i => (
  <span
    key={i}
    className="comment-holder"
  />
));
