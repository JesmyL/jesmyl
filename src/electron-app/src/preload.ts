import { contextBridge, ipcRenderer } from 'electron';
import { electronAppClientEventKey, electronAppInterfaceWindowKey, electronAppServerEventKey } from './const';
import { ElectronAppWindowInvokeApiBox, ElectronAppWindowInvokeDataWithTool } from './model';

const box: ElectronAppWindowInvokeApiBox = {
  invoke: args => ipcRenderer.invoke(electronAppClientEventKey, args),
  onServerEvent: callback => {
    const subscription = async (_: unknown, data: ElectronAppWindowInvokeDataWithTool) => callback(data);

    ipcRenderer.on(electronAppServerEventKey, subscription);
    return () => {
      ipcRenderer.off(electronAppServerEventKey, subscription);
    };
  },
};

contextBridge.exposeInMainWorld(electronAppInterfaceWindowKey, box);
