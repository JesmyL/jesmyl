import styled from 'styled-components';

const checkClassName = 'check-nested-feature-supports';
const opacity = '0.234';

const style = document.createElement('style');
style.innerText = `
html {
  .${checkClassName} {
    opacity: ${opacity};
    }
    }
    `;

const checkDiv = document.createElement('div');
checkDiv.classList.add(checkClassName);

document.head.appendChild(style);
document.head.appendChild(checkDiv);

const isSupports = window.getComputedStyle(checkDiv).opacity === opacity;

style.remove();
checkDiv.remove();

export const cmComCommentMakeStyleNode = isSupports
  ? (styleCssStr: string) => <style>{styleCssStr}</style>
  : (styleCssStr: string) => <Style $text={`html:has(&){${styleCssStr}}`} />;

const Style = styled.div<{ $text: string }>`
  ${props => props.$text}
`;
