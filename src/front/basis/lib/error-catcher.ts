export const logFrontErrors = () => {
  const container = document.getElementById('error-log-list');

  if (container == null) return;

  const errorList = document.createElement('div');
  let timeout: TimeOut;
  let isInserted = false;

  const insertErrorToDOM = () => {
    if (isInserted) return;

    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const root = document.querySelector('#root');
      if (!root?.innerHTML) {
        container.appendChild(errorList);
        isInserted = true;
      }
    }, 1000);
  };

  window.onerror = function myErrorHandler(errorMessage, url, lineNumber, _, error) {
    const div = document.createElement('div');

    div.innerText = `${error?.stack || ''}\n${errorMessage}\n\n${url}\n\nline:${lineNumber}`;
    div.style.color = 'red';
    div.style.marginBottom = '20px';
    div.style.fontFamily = 'monospace';
    div.style.fontSize = '12px';

    let clicks = 7;
    div.onclick = () => {
      if (clicks-- === 0) div.innerText += `\n\n\n${window.location.href}\n\nlocation`;
    };

    errorList.appendChild(div);
    insertErrorToDOM();

    return false;
  };

  window.addEventListener('unhandledrejection', event => {
    const div = document.createElement('div');
    const errorReason = event.reason;

    div.innerText = `[Async Error]\n${errorReason?.stack || errorReason?.message || errorReason}\n\nURL: ${window.location.href}`;
    div.style.color = 'orange';
    div.style.marginBottom = '20px';
    div.style.fontFamily = 'monospace';
    div.style.fontSize = '12px';

    errorList.appendChild(div);
    insertErrorToDOM();
  });
};
