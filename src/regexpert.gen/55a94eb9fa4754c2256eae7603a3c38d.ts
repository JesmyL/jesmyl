/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-namespace */
import('../front/apps/cm/07-shared/lib/Com/parents/40-Texts');

namespace N55a94eb9fa4754c2256eae7603a3c38d_1 {
  type $0 = string; // `${$lead}${$before}${$start}${U1 | ''}${$content}${U2 | ''}${$end}${$endNl}`;
  type $lead = `${$2}#@>${number}#@>${number}#@>`;
  type $2 = `` | `\n`;
  type $before = string | '';
  type $start = `${RepeatingString<`/`>}`;
  type $content = string | '';
  type $end = `${RepeatingString<`\\`>}`;
  type $endNl = `${`\n` | ''}`;
  
  type U1 = `&nbsp;`;
  type U2 = U1;

  export interface I extends Record<
    `/(?<lead>(^|\\n)#@>\\d+#@>\\d+#@>)(?<before>.*?)(?<start>/+)(?:&nbsp;)?(?<content>[^\\\\/]*?)(?:&nbsp;)?(?<end>\\\\+)(?<endNl>\\n?)/g`,
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
  extends N55a94eb9fa4754c2256eae7603a3c38d_1.I {
    '': ''
}