# README.cm-meetings.md

## Выбранные комы в меню страницы «События»

На странице «События» (маршруты `/cm/li/events`, создаваемые `makeCmEventNestedRoute`) пункт «Выбранные» есть и в меню открытого события (`CmMeetingControls`, «...» в шапке), и в меню страницы списка событий (`CmMeetingsPage`): он открывает Modal со списком выбранных комов (`cmComSelectedComwsAtom`). Пункт скрыт, когда список пуст. Модалка рендерится вне BottomPopup (общий модульный атом, `Modal isRenderHere`), поэтому живёт между закрытием попапа и навигацией.

## Интерпретация кома события

Ком, открытый с маршрута событий (когда `schw` есть в URL), отображается в интерпретации этого события: `makeCmComNestedRoute` предоставляет `CmComInterpretationSchwContext` из URL-`schw`, а `TheComposition` читает его через `useCmComInterpretationSchw()` и передаёт в `useCmCom(comw, ...)`. При этом `cmComLastOpenSchwAtom` на маршрутах событий сознательно не выставляется (`isIgnoreLastOpenSchw` — защита SchAlarm/WelcomeQR), поэтому интерпретация приходит только из контекста. Вне маршрутов событий поведение прежнее (фолбэк на `cmComLastOpenSchwAtom`).
