let isFirst = true;
if (window.location.hash === '#;J') window.location.hash = ':J';
else window.location.hash = ';J';

window.addEventListener('load', () => window.history.pushState({}, ''));

window.addEventListener('popstate', () => {
    window.history.pushState({}, '');
    if (isFirst) isFirst = false;
    else next();
});

const listeners: Record<string, () => void> = {};
const next = () => Object.values(listeners).forEach(listener => listener());

const onBackButton = {
    listen: (name: string, listener: () => void) => listeners[name] = listener,
    mute: (name: string) => { delete listeners[name] },
};

export default onBackButton;