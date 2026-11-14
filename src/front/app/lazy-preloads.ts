/**
 * Ленивые модули, доступные без проверки прав: их чанки уже лежат в precache,
 * а прогрев на старте избавляет от ожидания динамического import() при первом открытии.
 */
const ungatedLazyImporters = [
  () => import('#shared/ui/the-icon/LazyLoadedIcon'),
  () => import('#features/app-footer-swipeable'),
  () => import('#widgets/metronome/ui/LazyMetronome'),
  () => import('#shared/ui/configurators/Icon'),
];

let isUngatedLazyModulesPreloaded = false;

/**
 * Вызывает динамические import() всех не гейтящихся правами ленивых модулей,
 * чтобы к моменту первого показа их код уже был загружен и исполнен.
 */
export const preloadUngatedLazyModules = () => {
  if (isUngatedLazyModulesPreloaded) return;
  isUngatedLazyModulesPreloaded = true;

  void Promise.all(ungatedLazyImporters.map(importer => importer().catch(() => null)));
};
