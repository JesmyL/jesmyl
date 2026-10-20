// @vitest-environment node
import { describe, expect, it } from 'vitest';
import { MenuComToolName } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { DynLocaleKey } from 'shared/model/+locale/_DynLocaleKey';
import { IF } from 'shared/utils/stringTemplater';
import { baseLocaleTemplate, dynamicLocaleTemplate } from './templates';

describe('locale templates', () => {
  it('keeps the output unchanged without vars', () => {
    expect(baseLocaleTemplate(BaseLocaleKey.CmApp)`$x is not a var`).toEqual({
      [BaseLocaleKey.CmApp]: '$x is not a var',
    });
  });

  it('checks the passed vars', () => {
    expect(baseLocaleTemplate(BaseLocaleKey.CmApp, ['$x'])`Hi $x`).toEqual({ [BaseLocaleKey.CmApp]: 'Hi $x' });
    expect(() => baseLocaleTemplate(BaseLocaleKey.CmApp, ['$x'])`Hi`).toThrow('The args $x is not used in template');

    expect(dynamicLocaleTemplate(DynLocaleKey.BibleChapterNum, ['$c'])`Глава $c`).toEqual({
      [DynLocaleKey.BibleChapterNum]: 'Глава $c',
    });
    expect(() => dynamicLocaleTemplate(DynLocaleKey.BibleChapterNum, ['$c'])``).toThrow(
      'The args $c is not used in template',
    );
  });

  it('checks the passed vars alongside a record subkey', () => {
    expect(
      baseLocaleTemplate(BaseLocaleKey.CmMarkComTool, MenuComToolName.MarkCom, ['$v'])`${IF('$v').THEN`Yes`.ELSE`No`}`,
    ).toEqual({ [MenuComToolName.MarkCom]: '$IF{{$v}{Yes}{No}}' });

    expect(() =>
      baseLocaleTemplate(
        BaseLocaleKey.CmMarkComTool,
        MenuComToolName.MarkCom,
        ['$v', '$w'],
      )`${IF('$v').THEN`Yes`.ELSE`No`}`,
    ).toThrow('The args $w is not used in template');
  });
});
