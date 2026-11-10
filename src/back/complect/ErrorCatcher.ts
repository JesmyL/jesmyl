// Снимаем ранее зарегистрированные обработчики, чтобы дальше повесить единственный собственный.
process.listeners('uncaughtException').forEach(func => {
  process.off('uncaughtException', func);
});

export class ErrorCatcher {
  static logAllErrors() {
    // Все непойманные исключения процесса просто пишем в консоль — телеграм-логирование здесь больше не используется.
    process.on('uncaughtException', err => console.error(err));
  }
}
