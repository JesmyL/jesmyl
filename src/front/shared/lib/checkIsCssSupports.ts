const divCheckerClassName = 'div-for-css-checkings';
const divCheckWidth = 100;

const checkedRules: PRecord<string, boolean> = {};

export const checkIsCssRuleSupports = (cssRule: string) => {
  if (checkedRules[cssRule] !== undefined) return checkedRules[cssRule];

  const div = document.createElement('div');
  const style = document.createElement('style');
  div.classList.add(divCheckerClassName);

  document.body.appendChild(style);
  document.body.appendChild(div);

  style.innerText = `.${divCheckerClassName}{width:0;}@supports(${cssRule}){.${divCheckerClassName}{width:${divCheckWidth}px;}}`;

  const isSupports = div.clientWidth === divCheckWidth;
  checkedRules[cssRule] = isSupports;

  style.remove();
  div.remove();

  return isSupports;
};
