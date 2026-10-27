/** Strips the `data:<mime>;base64,` wrapper, leaving pure base64 with no line breaks. */
export const takeBase64FromDataUrl = (dataUrl: string) => dataUrl.slice(dataUrl.indexOf(',') + 1);

export const convertFileToBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve('' + reader.result);
    reader.onerror = reject;
  });
