import React from 'react';
import { useCats } from '../../cols/useCols';
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
