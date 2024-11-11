const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  navigateUrl: (url) => ipcRenderer.send('navigate-url', url)
});