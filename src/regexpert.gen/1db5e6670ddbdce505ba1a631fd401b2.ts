/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import('../shared/const/cm/Com/parents/40-Texts');

namespace N1db5e6670ddbdce505ba1a631fd401b2_1 {
  type $0 = string; // `${$lead}${$before}${$start}${U1 | ''}${$content}${U2 | ''}${$end}${$endNl}`;
  type $lead = `${$2}${number}{${string}}`;
  type $2 = `` | `\n`;
  type $before = string | '';
  type $start = `${RepeatingString<`/`>}`;
  type $content = string | '';
  type $end = `${RepeatingString<`\\`>}`;
  type $endNl = `${`\n` | ''}`;
  
  type U1 = string;
  type U2 = U1;

  export interface I extends Record<
    `/(?<lead>(^|\\n)\\d{${string}})(?<before>.*?)(?<start>/+)(?:${string})?(?<content>[^\\\\/]*?)(?:${string})?(?<end>\\\\+)(?<endNl>\\n?)/g`,
    {
      $0: $0;
      lead: $lead;
      $2: $2;
      before: $before;
      start: $start;
      content: $content;
      end: $end;
      endNl: $endNl
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends N1db5e6670ddbdce505ba1a631fd401b2_1.I {
    '': ''
}