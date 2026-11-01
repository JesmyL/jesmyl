import { describe, expect, it } from 'vitest';

import { Bool } from 'shared/enums';
import { chordsBlockIncorrectMessage } from 'shared/utils/cm/com/chordsBlockIncorrectMessage';

const takeMessage = (value: string, isHardChords: Bool) =>
  chordsBlockIncorrectMessage(value, isHardChords).errors?.[0].message;

const lightModificatedChords = ['Dsus2', 'D2', 'Cadd9', 'Cdim', 'Caug', 'Dmaj9', 'C5', 'C6', 'C+'];
const hardModificatedChords = ['G7#9', 'Am7b5', 'C7b9'];
const lightModificatedRepeatChords = ['|C..F.-Dsus2|'];
const hardModificatedRepeatChords = ['C..Fb7'];

describe('chordsBlockIncorrectMessage', () => {
  it.each(lightModificatedChords)('reports %s as too complex in simple mode', chord => {
    expect(takeMessage(chord, Bool.False)).toContain(`Аккорд "${chord}" слишком сложн`);
  });

  it.each([...lightModificatedChords, ...hardModificatedChords])('accepts %s in hard mode', chord => {
    expect(chordsBlockIncorrectMessage(chord, Bool.True)).toEqual({});
  });

  it.each(hardModificatedChords)('reports %s as too complex in simple mode', chord => {
    expect(takeMessage(chord, Bool.False)).toContain(`Аккорд "${chord}" слишком сложн`);
  });

  it.each(lightModificatedRepeatChords)('reports %s with light modificators in a repeat as too complex in simple mode', chord => {
    expect(takeMessage(chord, Bool.False)).toContain(`Аккорд "${chord}" слишком сложн`);
  });

  it.each(hardModificatedRepeatChords)('reports %s with hard modificators in a repeat as too complex in simple mode', chord => {
    expect(takeMessage(chord, Bool.False)).toContain(`Аккорд "${chord}" слишком сложн`);
  });

  it.each([...lightModificatedRepeatChords, ...hardModificatedRepeatChords])('accepts repeat %s in hard mode', chord => {
    expect(chordsBlockIncorrectMessage(chord, Bool.True)).toEqual({});
  });

  it('reports a light modificator regardless of the bass chord', () => {
    expect(takeMessage('Dsus2/G', Bool.False)).toContain('Аккорд "Dsus2/G" слишком сложн');
  });

  it.each(['|C..F.-Am|', 'C..F7'])('accepts simple chord %s in simple mode', chord => {
    expect(chordsBlockIncorrectMessage(chord, Bool.False)).toEqual({});
  });

  it('keeps reporting wrongly written chords', () => {
    expect(takeMessage('Cmm', Bool.False)).toContain('не верно написан');
  });
});
