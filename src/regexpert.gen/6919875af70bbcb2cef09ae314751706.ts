/* eslint-disable @typescript-eslint/no-namespace */

namespace N6919875af70bbcb2cef09ae314751706_1 {
  type $0 = `${Tbefore}${TbeforeSpaces}${Thashes}${TblockHashPosition}${Tassociations | ''}${''|` ${string}`}${Tinfo | ''}${TbeforeCommentSpaces}${Tcomment}${U1}`;
  type Tbefore = `` | `\n`;
  type TbeforeSpaces = `${''|` ${string}`}`;
  type Thashes = `#${string}`;
  type TblockHashPosition = string;
  type Tassociations = `${`_` | ''}${TsecretWidStr}${Tmodificators}`;
  type TsecretWidStr = `${''|`${string}${string}`}`;
  type Tmodificators = `${`!` | ''}`;
  type Tinfo = `[${TblockHeader}]`;
  type TblockHeader = `${string}${string}`;
  type TbeforeCommentSpaces = `${''|` ${string}`}`;
  type Tcomment = `${string}${string}`;
  
  type U1 = ''; // `\n${''|` ${string}`}#` | ``;

  export interface I extends Record<
    `/(?<before>^|\\n)(?<beforeSpaces> *)(?<hashes>#{1,2})(?<blockHashPosition>${string})(?<associations>_?(?<secretWidStr>[${string}]*)(?<modificators>!?))? *(?<info>\\[(?<blockHeader>.+?)\\])?(?<beforeCommentSpaces> *)(?<comment>[\\w\\W]+?)(?=\\n *#|$)/g`,
    {
      $0: $0;
      before: Tbefore;
      beforeSpaces: TbeforeSpaces;
      hashes: Thashes;
      blockHashPosition: TblockHashPosition;
      associations?: Tassociations;
      secretWidStr?: TsecretWidStr;
      modificators?: Tmodificators;
      info?: Tinfo;
      blockHeader?: TblockHeader;
      beforeCommentSpaces: TbeforeCommentSpaces;
      comment: Tcomment
    }
  > { '': '' }
}

namespace N6919875af70bbcb2cef09ae314751706_2 {
  type $0 = `${Ttranslate}:${Tbook}${''|` ${string}`}${Tchapter}:${TverseDiapason}`;
  type Ttranslate = string;
  type Tbook = `${TbookPrefix | ''}${TbookTitle}`;
  type TbookPrefix = `${TbookNumberWithSuffix}${''|` ${string}`}`;
  type TbookNumberWithSuffix = `${TbookNumber}${`-` | ''}${TbookNumberSuffix}` | TbookTitleFrom;
  type TbookNumber = `${number}`;
  type TbookNumberSuffix = `${string | ''}`;
  type TbookTitleFrom = `От`;
  type TbookTitle = `${string}${string}`;
  type Tchapter = `${number}`;
  type TverseDiapason = `${TverseFrom}${TverseTail | ''}`;
  type TverseFrom = `${number}`;
  type TverseTail = `-${TverseTo}`;
  type TverseTo = `${number}`;

  export interface I extends Record<
    `/(?<translate>${string}):(?<book>(?<bookPrefix>(?<bookNumberWithSuffix>(?<bookNumber>\\d{1,3})-?(?<bookNumberSuffix>[яе]?)|(?<bookTitleFrom>От)) *)?(?<bookTitle>[а-яё]+))+ *(?<chapter>\\d{1,3}):(?<verseDiapason>(?<verseFrom>\\d{1,3})(?<verseTail>-(?<verseTo>\\d{1,3}))?)/gi`,
    {
      $0: $0;
      translate: Ttranslate;
      book: Tbook;
      bookPrefix?: TbookPrefix;
      bookNumberWithSuffix?: TbookNumberWithSuffix;
      bookNumber?: TbookNumber;
      bookNumberSuffix?: TbookNumberSuffix;
      bookTitleFrom?: TbookTitleFrom;
      bookTitle: TbookTitle;
      chapter: Tchapter;
      verseDiapason: TverseDiapason;
      verseFrom: TverseFrom;
      verseTail?: TverseTail;
      verseTo?: TverseTo
    }
  > { '': '' }
}

interface _GlobalScopedNamedRegExpMakerGeneratedTypes
  extends N6919875af70bbcb2cef09ae314751706_1.I,
    N6919875af70bbcb2cef09ae314751706_2.I {
    '': ''
}