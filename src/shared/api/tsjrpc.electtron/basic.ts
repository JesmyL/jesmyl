export type ElectronBasicTsjrpcModel = {
  selectFiles: () => string[];
  selectDir: (args: { create?: string }) => string | nil;
};
