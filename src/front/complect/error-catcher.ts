export const logFrontErrors = () => {
  const container = document.getElementById('error-log-list');

  if (container == null) return;

  const errorList = document.createElement('div');
  let timeout: TimeOut;
  let isInserted = false;

  window.onerror = function myErrorHandler(errorMessage, url, lineNumber, _, error) {
    const div = document.createElement('div');

    div.innerText = `${error?.stack || ''}\n${errorMessage}\n\n${url}\n\nline:${lineNumber}`;

    div.style.color = 'red';
    div.style.marginBottom = '20px';

    let clicks = 7;
    div.onclick = () => {
      if (clicks-- === 0) div.innerText += `\n\n\n${window.location.href}\n\nlocation`;
    };

    errorList.appendChild(div);

    if (!isInserted) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const root = document.querySelector('#root');

        if (!root?.innerHTML) container.appendChild(errorList);
      }, 1000);
    }

    return false;
  };
};
