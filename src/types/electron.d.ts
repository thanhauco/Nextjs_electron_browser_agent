export interface ElectronAPI {
  navigateUrl: (url: string) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}