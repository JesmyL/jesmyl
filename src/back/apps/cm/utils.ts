export const updateCmComOrderModulationValue = <MdHolder extends { md?: number | nil }>(
  mdHolder: MdHolder,
  value: number,
) => {
  if (mdHolder.md) mdHolder.md = (value ?? 0) + Math.abs(mdHolder.md - Math.trunc(mdHolder.md));
  else mdHolder.md = value || undefined;
};

export const updateCmComOrderTonTypeSwitcherValue = <MdHolder extends { md?: number | nil }>(mdHolder: MdHolder) => {
  let isAdd = true;

  if (mdHolder.md) {
    if (Math.trunc(mdHolder.md) === mdHolder.md) mdHolder.md = +`${mdHolder.md}.1`;
    else {
      mdHolder.md = Math.trunc(mdHolder.md);
      isAdd = false;
    }
  } else mdHolder.md = 0.1;

  return isAdd;
};
