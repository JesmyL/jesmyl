declare var XLSX: { read(data: unknown, options: {}): any; utils: { sheet_to_row_object_array(prop: any): any } };

export const excel2jsonParserBox = (awaitTimeMs: number = 10000) => {
  let untilMs = Date.now() + awaitTimeMs;

  return new Promise<(file: File) => Promise<Record<string, string>[]>>((resolve, reject) => {
    const tryGet = () => {
      if (typeof XLSX === 'undefined') {
        if (Date.now() < untilMs) setTimeout(tryGet, awaitTimeMs / 100);
        else reject('Для чтения файлов Excel необходимо соединение с интернет');

        return;
      }

      resolve((file: File) => {
        return new Promise((fileResolve, fileReject) => {
          const reader = new FileReader();

          reader.onload = function (event) {
            const data = event.target?.result;

            if (data == null) {
              fileReject();
              return null;
            }

            const workbook = XLSX.read(data, { type: 'binary' });

            workbook.SheetNames.forEach((sheetName: string) => {
              try {
                fileResolve(XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]));
              } catch (error) {
                fileReject();
              }
            });
          };

          reader.onerror = fileReject;

          reader.readAsBinaryString(file);
        });
      });
    };

    tryGet();
  });
};
