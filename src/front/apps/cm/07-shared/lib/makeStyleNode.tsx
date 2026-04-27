import { Global, SerializedStyles } from '@emotion/react';

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
  ? (styleCssStr: SerializedStyles) => <style>{styleCssStr.styles}</style>
  : (styleCssStr: SerializedStyles) => <Global styles={styleCssStr} />;
