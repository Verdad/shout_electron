// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const { contextBridge, ipcRenderer } = require('electron');
const log = require("electron-log");

contextBridge.exposeInMainWorld("electronApi", {
  send: (channel, data) => {
      // whitelist channels
      let validChannels = ["toMain", "electronNotify"];
      if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
      }
  },
  receive: (channel, func) => {
      let validChannels = ["fromMain", "fromElectron"];
      if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender` 
          ipcRenderer.on(channel, (event, ...args) => {
            console.log("Sending to mainWindow receive function: ", ...args);
            func(...args)
          });
      }
  }
})

log.info("electronApi exposed to the mainWindow");