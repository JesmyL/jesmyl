import { translateBase } from '#basis/locale';
import { ColorGamut, builtInColorGamuts } from '#basis/model/ColorGamut.model';
import { BrutalItem } from '#shared/ui/brutal-item/BrutalItem';
import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { indexIDB } from '$index/shared/state';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

const GamutSwatch = ({ gamut }: { gamut: ColorGamut }) => (
  <span
    className="relative h-5 w-5 shrink-0 overflow-hidden rounded"
    style={{ background: gamut.x1, boxShadow: `inset 0 0 0 1px ${gamut.x2}` }}
  >
    <span
      className="absolute inset-x-0 bottom-0 h-[5px]"
      style={{ background: gamut.x7 }}
    />
    <span
      className="absolute inset-x-0 top-0.5 text-center text-[8px] font-black leading-none"
      style={{ color: gamut.x3 }}
    >
      Aa
    </span>
  </span>
);

export function IndexSettingsColorGamut() {
  const [gamutIndex, setGamutIndex] = indexIDB.use.appColorGamutIndex();

  return (
    <BrutalItem
      iconNode={<LazyIcon icon="PaintBoard" />}
      title={translateBase(BaseLocaleKey.ColorGamut)}
      box={
        <Dropdown
          id={gamutIndex ?? undefined}
          items={builtInColorGamuts.map(({ light, localeKey }, gamuti) => ({
            id: gamuti + 1,
            title: (
              <span className="flex items-center gap-2">
                <GamutSwatch gamut={light} />
                {translateBase(localeKey)}
              </span>
            ),
          }))}
          undTitle={translateBase(BaseLocaleKey.ByDefault)}
          onSelectId={selectedIndex => setGamutIndex(selectedIndex ?? null)}
        />
      }
    />
  );
}
