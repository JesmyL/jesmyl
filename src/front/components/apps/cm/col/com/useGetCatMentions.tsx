import { useCats } from '$cm/basis/lib/hooks/useCats';
import React from 'react';
import { Com } from './Com';

export const CmComCatMentions = ({ com }: { com: Com }) => {
  const cats = useCats();

  return com.catMentions(cats).map((mention, mentioni) => (
    <React.Fragment key={mentioni}>
      {mentioni ? ', ' : ''}
      <span className="nowrap">{mention}</span>
    </React.Fragment>
  ));
};
