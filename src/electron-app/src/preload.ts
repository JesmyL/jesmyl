import { contextBridge, ipcRenderer } from 'electron';
import { TSJRPCInvokeData } from 'tsjrpc';
import { electronAppClientEventKey, electronAppInterfaceWindowKey, electronAppServerEventKey } from './const';
import { ElectronAppWindowInvokeApiBox } from './model';

const box: ElectronAppWindowInvokeApiBox = {
  invoke: (invoke, requestId) => ipcRenderer.invoke(electronAppClientEventKey, { invoke, requestId }),
  onServerEvent: callback => {
    const subscription = async (_: unknown, data: TSJRPCInvokeData) => callback(data);

    ipcRenderer.on(electronAppServerEventKey, subscription);
    return () => ipcRenderer.off(electronAppServerEventKey, subscription);
  },
};

contextBridge.exposeInMainWorld(electronAppInterfaceWindowKey, box);
