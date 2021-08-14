const { app, BrowserWindow, Menu, ipcMain, Notification } = require('electron');
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");
const path = require('path');
//-------------------------------------------------------------------
// Logging
//
// THIS SECTION IS NOT REQUIRED
//
// This logging setup is not required for auto-updates to work,
// but it sure makes debugging easier :)
//-------------------------------------------------------------------
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

const isMac = process.platform === "darwin";
const isDev = require('electron-is-dev');

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, 'preload.js')
    },
  })
  // Use this code if we build a front end application
  //mainWindow.loadURL(
  //  process.env.ELECTRON_START_URL ||
  //    url.format({
  //      //pathname: path.join(__dirname, '/../public/index.html'),
  //      pathname: path.join(__dirname, '../build/index.html'),
  //      protocol: 'file:',
  //      slashes: true,
  //    })
  //)
  mainWindow.loadURL( isDev ? "http://localhost:3000/shout_electron" : "https://www.shout.app/start_shout_desktop");
  if (isDev) {
    mainWindow.openDevTools();
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function showNotification (params) {
  //log.info("showNotification params: ", params);
  let {title, body, icon, silent, badge, image, error} =  params;
  if (error) {
    throw new Error("Electron showNotification received the error parameter.")
  }
  return await new Notification(params).show()
}

app.on('ready', function() {
  createWindow();
  // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify();
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
  log.info("on activate.");
})

ipcMain.on("electronNotify", (event, data) => {
  showNotification(data).then( () => {
    mainWindow.webContents.send("fromElectron", {status: true, type: "electronNotify", data});
  })
  .catch( error => {
    //log.info("Error: ", error);
    mainWindow.webContents.send("fromElectron", {status: false, type: "electronNotify", data, error});
  });
});

// Create menu template
const mainMenuTemplate = [
  {
    label: "Shout Desktop",
    submenu: [
      {
        label: "Inbox",
        click: () => {
          //console.log("menuItem: ", menuItem, "mainWindow: ", mainWindow, "event: ", event);
          mainWindow.loadURL("https://www.shout.app/inbox")
        }
      },
      {
        label: "Orders",
        click: () => {
          mainWindow.loadURL("https://www.shout.app/orders")
        }
      },
      {
        label: "Shipping",
        click: () => {
          mainWindow.loadURL("https://www.shout.app/shipping")
        }
      },
      {
        label: "Contacts",
        click: () => {
          mainWindow.loadURL("https://www.shout.app/profiles")
        }
      },
      {
        label: "About",
        role: "about"
      },
      {
        label: "Quit",
        //accelerator: isMac ? "Command+Q" : "Control+Q",
        role: "quit"
      }
    ]
  },
  {
    label: "Settings",
    submenu: [
      {
        label: "My Profile",
        click: () => mainWindow.loadURL("https://www.shout.app/profile/edit")
      },
      {
        label: "Usage",
        click: () => mainWindow.loadURL("https://www.shout.app/profile/usage")
      },
      {
        label: "Privacy",
        click: () => mainWindow.loadURL("https://www.shout.app/profile/privacy_settings")
      }
    ]
  },
  {
    label: "Window",
    role: "windowMenu"
  },
  {
    label: "View",
    role: "viewMenu"
  }
];

const macMenu = isMac ? mainMenuTemplate.push({
    label: "Help",
    role: "help"
  }) : null;