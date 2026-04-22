import { mylib } from '#shared/lib/my-lib';
import styled, { RuleSet } from 'styled-components';

const checkClassName = 'check-nested-feature-supports';
const opacity = '0.234';

const style = document.createElement('style');
style.innerText = `html{.${checkClassName}{opacity:${opacity};}}`;

const checkDiv = document.createElement('div');
checkDiv.classList.add(checkClassName);

document.head.appendChild(style);
document.head.appendChild(checkDiv);

const isSupports = window.getComputedStyle(checkDiv).opacity === opacity;

style.remove();
checkDiv.remove();

export const makeStyleNode = isSupports
  ? (styleCssStr: string | RuleSet<object>) => <style>{joinRecursively(styleCssStr)}</style>
  : (styleCssStr: string | RuleSet<object>) => <Style $text={`html:has(&){${joinRecursively(styleCssStr)}}`} />;

const Style = styled.div<{ $text: string }>`
  ${props => props.$text}
`;

const joinRecursively = (value: unknown) => {
  const joinRecursively = (value: unknown) => {
    let result = '';

    if (mylib.isStr(value) || mylib.isNum(value)) result += value;
    else if (mylib.isArr(value)) {
      for (let i = 0; i < value.length; i++) {
        result += joinRecursively(value[i]);
      }
    } else if (mylib.isFunc(value)) result += joinRecursively(value());

    return result;
  };

  return joinRecursively(value);
};
