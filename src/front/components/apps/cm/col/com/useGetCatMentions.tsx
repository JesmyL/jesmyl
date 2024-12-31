import React from 'react';
import { useCols } from '../../cols/useCols';
import { Com } from './Com';

export const CmComCatMentions = ({ com }: { com: Com }) => {
  const cols = useCols();

  return com.catMentions(cols?.cats).map((mention, mentioni) => (
    <React.Fragment key={mentioni}>
      {mentioni ? ', ' : ''}
      <span className="nowrap">{mention}</span>
    </React.Fragment>
  ));
};
